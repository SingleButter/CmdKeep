use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Command {
    pub id: Option<i64>,
    pub title: String,
    pub command: String,
    pub description: String,
    pub category: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<String>,
}

pub struct Database {
    conn: Mutex<Connection>,
}

impl Database {
    pub fn new(path: &str) -> Result<Self> {
        let conn = Connection::open(path)?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS commands (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                command TEXT NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )",
            [],
        )?;

        Ok(Database {
            conn: Mutex::new(conn),
        })
    }

    pub fn get_all_commands(&self) -> Result<Vec<Command>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, title, command, description, category, created_at, updated_at
             FROM commands
             ORDER BY updated_at DESC"
        )?;

        let commands = stmt.query_map([], |row| {
            Ok(Command {
                id: Some(row.get(0)?),
                title: row.get(1)?,
                command: row.get(2)?,
                description: row.get(3)?,
                category: row.get(4)?,
                created_at: Some(row.get(5)?),
                updated_at: Some(row.get(6)?),
            })
        })?
        .collect::<Result<Vec<_>>>()?;

        Ok(commands)
    }

    pub fn search_commands(&self, query: &str, category: Option<&str>) -> Result<Vec<Command>> {
        let conn = self.conn.lock().unwrap();

        let sql = if category.is_some() {
            format!(
                "SELECT id, title, command, description, category, created_at, updated_at
                 FROM commands
                 WHERE (title LIKE ?1 OR command LIKE ?1 OR description LIKE ?1)
                 AND category = ?2
                 ORDER BY updated_at DESC"
            )
        } else {
            format!(
                "SELECT id, title, command, description, category, created_at, updated_at
                 FROM commands
                 WHERE title LIKE ?1 OR command LIKE ?1 OR description LIKE ?1
                 ORDER BY updated_at DESC"
            )
        };

        let search_term = format!("%{}%", query);
        let mut stmt = conn.prepare(&sql)?;

        let commands = if let Some(cat) = category {
            stmt.query_map([&search_term, &cat.to_string()], |row| {
                Ok(Command {
                    id: Some(row.get(0)?),
                    title: row.get(1)?,
                    command: row.get(2)?,
                    description: row.get(3)?,
                    category: row.get(4)?,
                    created_at: Some(row.get(5)?),
                    updated_at: Some(row.get(6)?),
                })
            })?
            .collect::<Result<Vec<_>>>()?
        } else {
            stmt.query_map([&search_term], |row| {
                Ok(Command {
                    id: Some(row.get(0)?),
                    title: row.get(1)?,
                    command: row.get(2)?,
                    description: row.get(3)?,
                    category: row.get(4)?,
                    created_at: Some(row.get(5)?),
                    updated_at: Some(row.get(6)?),
                })
            })?
            .collect::<Result<Vec<_>>>()?
        };

        Ok(commands)
    }

    pub fn add_command(&self, cmd: &Command) -> Result<i64> {
        let conn = self.conn.lock().unwrap();
        let now = chrono::Local::now().to_rfc3339();

        conn.execute(
            "INSERT INTO commands (title, command, description, category, created_at, updated_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            [
                &cmd.title,
                &cmd.command,
                &cmd.description,
                &cmd.category,
                &now,
                &now,
            ],
        )?;

        Ok(conn.last_insert_rowid())
    }

    pub fn update_command(&self, cmd: &Command) -> Result<()> {
        let conn = self.conn.lock().unwrap();
        let now = chrono::Local::now().to_rfc3339();

        conn.execute(
            "UPDATE commands
             SET title = ?1, command = ?2, description = ?3, category = ?4, updated_at = ?5
             WHERE id = ?6",
            [
                &cmd.title,
                &cmd.command,
                &cmd.description,
                &cmd.category,
                &now,
                &cmd.id.unwrap().to_string(),
            ],
        )?;

        Ok(())
    }

    pub fn delete_command(&self, id: i64) -> Result<()> {
        let conn = self.conn.lock().unwrap();
        conn.execute("DELETE FROM commands WHERE id = ?1", [id])?;
        Ok(())
    }

    pub fn get_categories(&self) -> Result<Vec<String>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare("SELECT DISTINCT category FROM commands ORDER BY category")?;

        let categories = stmt.query_map([], |row| row.get(0))?
            .collect::<Result<Vec<_>>>()?;

        Ok(categories)
    }
}
