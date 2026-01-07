import { useState, useEffect } from "react";
import { Command } from "../types";
import { X } from "lucide-react";

interface AddCommandModalProps {
  command: Command | null;
  onClose: () => void;
  onSave: (command: Command) => void;
}

function AddCommandModal({ command, onClose, onSave }: AddCommandModalProps) {
  const [title, setTitle] = useState("");
  const [commandText, setCommandText] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (command) {
      setTitle(command.title);
      setCommandText(command.command);
      setDescription(command.description);
      setCategory(command.category);
    }
  }, [command]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !commandText.trim() || !category.trim()) {
      alert("请填写所有必填字段");
      return;
    }

    onSave({
      title: title.trim(),
      command: commandText.trim(),
      description: description.trim(),
      category: category.trim(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{command ? "编辑命令" : "添加新命令"}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">标题 *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如: 重命名本地分支"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">分类 *</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="例如: Git, Linux, Docker, Azure, SQL"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="command">命令 *</label>
            <textarea
              id="command"
              value={commandText}
              onChange={(e) => setCommandText(e.target.value)}
              placeholder="例如: git branch -m old_name new_name"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">说明</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="命令的详细说明、注意事项等"
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="button-secondary" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="button-primary">
              {command ? "保存" : "添加"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCommandModal;
