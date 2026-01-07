// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod commands;

use db::Database;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let app_dir = app.path().app_data_dir().unwrap();
            std::fs::create_dir_all(&app_dir).unwrap();
            let db_path = app_dir.join("commands.db");

            let db = Database::new(db_path.to_str().unwrap()).unwrap();
            app.manage(db);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_all_commands,
            commands::search_commands,
            commands::add_command,
            commands::update_command,
            commands::delete_command,
            commands::get_categories,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
