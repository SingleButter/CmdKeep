import { useState } from "react";
import { Command } from "../types";
import { Copy, Edit2, Trash2, Check } from "lucide-react";

interface CommandItemProps {
  command: Command;
  onEdit: (command: Command) => void;
  onDelete: (id: number) => void;
}

function CommandItem({ command, onEdit, onDelete }: CommandItemProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const toggleExpanded = () => {
    if (command.description) {
      setIsExpanded(!isExpanded);
    }
  };

  const getRelativeTime = (timestamp?: string) => {
    if (!timestamp) return "";

    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffMs / 604800000);
    const diffMonths = Math.floor(diffMs / 2592000000);

    if (diffMins < 1) return "Added just now";
    if (diffMins < 60) return `Added ${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `Added ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return "Added 1 day ago";
    if (diffDays === 2) return "Added 2 days ago";
    if (diffDays < 7) return `Added ${diffDays} days ago`;
    if (diffWeeks === 1) return "Added 1 week ago";
    if (diffWeeks < 4) return `Added ${diffWeeks} weeks ago`;
    if (diffMonths === 1) return "Added 1 month ago";
    return `Added ${diffMonths} months ago`;
  };

  return (
    <div className="command-item">
      <div className="command-main" onClick={toggleExpanded} style={{ cursor: 'pointer' }}>
        <div className="command-content-wrapper">
          <div className="command-content">
            <div className="command-header">
              <div className="command-title-row">
                <span className="command-category">
                  <span className="category-dot"></span>
                  {command.category}
                </span>
                <h3 className="command-title">{command.title}</h3>
              </div>
            </div>

            <div className="command-code">
              <code>{command.command}</code>
            </div>
          </div>

          <div className="command-actions" onClick={(e) => e.stopPropagation()}>
            <button
              className={`icon-button copy-button ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              title={copied ? "已复制" : "复制命令"}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <button
              className="icon-button"
              onClick={() => onEdit(command)}
              title="编辑"
            >
              <Edit2 size={18} />
            </button>
            <button
              className="icon-button delete-button"
              onClick={() => command.id && onDelete(command.id)}
              title="删除"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={`command-description-dropdown ${isExpanded ? 'expanded' : ''}`}>
        {command.description && (
          <p className="command-description">{command.description}</p>
        )}
        <div className="command-footer">
          <span className="command-timestamp">
            {getRelativeTime(command.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommandItem;
