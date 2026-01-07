use crate::db::{Command, Database};
use tauri::State;

#[tauri::command]
pub fn get_all_commands(db: State<Database>) -> Result<Vec<Command>, String> {
    db.get_all_commands()
        .map_err(|e| format!("Failed to get commands: {}", e))
}

#[tauri::command]
pub fn search_commands(
    db: State<Database>,
    query: String,
    category: Option<String>,
) -> Result<Vec<Command>, String> {
    db.search_commands(&query, category.as_deref())
        .map_err(|e| format!("Failed to search commands: {}", e))
}

#[tauri::command]
pub fn add_command(db: State<Database>, command: Command) -> Result<i64, String> {
    db.add_command(&command)
        .map_err(|e| format!("Failed to add command: {}", e))
}

#[tauri::command]
pub fn update_command(db: State<Database>, command: Command) -> Result<(), String> {
    db.update_command(&command)
        .map_err(|e| format!("Failed to update command: {}", e))
}

#[tauri::command]
pub fn delete_command(db: State<Database>, id: i64) -> Result<(), String> {
    db.delete_command(id)
        .map_err(|e| format!("Failed to delete command: {}", e))
}

#[tauri::command]
pub fn get_categories(db: State<Database>) -> Result<Vec<String>, String> {
    db.get_categories()
        .map_err(|e| format!("Failed to get categories: {}", e))
}
