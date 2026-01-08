import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Command } from "./types";
import CommandList from "./components/CommandList";
import SearchBar from "./components/SearchBar";
import AddCommandModal from "./components/AddCommandModal";
import CategoryFilter from "./components/CategoryFilter";
import { Plus } from "lucide-react";

function App() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);

  useEffect(() => {
    loadCommands();
    loadCategories();
  }, []);

  const loadCommands = async () => {
    try {
      const result = await invoke<Command[]>("get_all_commands");
      setCommands(result);
    } catch (error) {
      console.error("Failed to load commands:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await invoke<string[]>("get_categories");
      setCategories(result);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "" && !selectedCategory) {
      loadCommands();
      return;
    }

    try {
      const result = await invoke<Command[]>("search_commands", {
        query: query || "",
        category: selectedCategory,
      });
      setCommands(result);
    } catch (error) {
      console.error("Failed to search commands:", error);
    }
  };

  const handleCategoryChange = async (category: string | null) => {
    setSelectedCategory(category);
    if (!category && searchQuery.trim() === "") {
      loadCommands();
      return;
    }

    try {
      const result = await invoke<Command[]>("search_commands", {
        query: searchQuery || "",
        category: category,
      });
      setCommands(result);
    } catch (error) {
      console.error("Failed to filter commands:", error);
    }
  };

  const handleAddCommand = async (command: Command) => {
    try {
      console.log("Saving command:", command);
      if (editingCommand && editingCommand.id) {
        await invoke("update_command", { command: { ...command, id: editingCommand.id } });
      } else {
        const result = await invoke("add_command", { command });
        console.log("Command added successfully:", result);
      }
      setIsModalOpen(false);
      setEditingCommand(null);
      loadCommands();
      loadCategories();
    } catch (error) {
      console.error("Failed to save command:", error);
      alert("保存失败：" + error);
    }
  };

  const handleEditCommand = (command: Command) => {
    setEditingCommand(command);
    setIsModalOpen(true);
  };

  const handleDeleteCommand = async (id: number) => {
    if (confirm("确定要删除这条命令吗?")) {
      try {
        await invoke("delete_command", { id });
        loadCommands();
        loadCategories();
      } catch (error) {
        console.error("Failed to delete command:", error);
      }
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="title">CmdKeep</h1>
          <p className="subtitle">命令速记工具</p>
        </div>
        <div className="header-right">
          <SearchBar onSearch={handleSearch} />
          <button
            className="add-button"
            onClick={() => {
              setEditingCommand(null);
              setIsModalOpen(true);
            }}
          >
            <Plus size={20} />
            添加命令
          </button>
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </aside>

        <main className="content">
          <CommandList
            commands={commands}
            onEdit={handleEditCommand}
            onDelete={handleDeleteCommand}
          />
        </main>
      </div>

      {isModalOpen && (
        <AddCommandModal
          command={editingCommand}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCommand(null);
          }}
          onSave={handleAddCommand}
        />
      )}
    </div>
  );
}

export default App;
