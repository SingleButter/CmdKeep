import { useState } from "react";
import { Command } from "../types";
import { Copy, Edit2, Trash2, Tag, Check } from "lucide-react";

interface CommandItemProps {
  command: Command;
  onEdit: (command: Command) => void;
  onDelete: (id: number) => void;
}

function CommandItem({ command, onEdit, onDelete }: CommandItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="command-item">
      <div className="command-header">
        <h3 className="command-title">{command.title}</h3>
        <div className="command-actions">
          <button
            className={`icon-button copy-button ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            title="复制命令"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "已复制" : "复制"}
          </button>
          <button
            className="icon-button"
            onClick={() => onEdit(command)}
            title="编辑"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="icon-button delete-button"
            onClick={() => command.id && onDelete(command.id)}
            title="删除"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="command-code">
        <code>{command.command}</code>
      </div>

      {command.description && (
        <p className="command-description">{command.description}</p>
      )}

      <div className="command-footer">
        <span className="command-category">
          <Tag size={14} />
          {command.category}
        </span>
      </div>
    </div>
  );
}

export default CommandItem;
