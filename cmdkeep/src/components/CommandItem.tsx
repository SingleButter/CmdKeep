import { useState } from "react";
import { Command } from "../types";
import { Copy, Edit2, Trash2, Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface CommandItemProps {
  command: Command;
  onEdit: (command: Command) => void;
  onDelete: (id: number) => void;
}

function CommandItem({ command, onEdit, onDelete }: CommandItemProps) {
  const { t, language } = useLanguage();
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

    if (language === 'zh') {
      if (diffMins < 1) return "刚刚添加";
      if (diffMins < 60) return `${diffMins}${t('addedMinutesAgo')}`;
      if (diffHours < 24) return `${diffHours}${t('addedHoursAgo')}`;
      if (diffDays === 1) return "1天前添加";
      if (diffDays === 2) return "2天前添加";
      if (diffDays < 7) return `${diffDays}${t('addedDaysAgo')}`;
      if (diffWeeks === 1) return "1周前添加";
      if (diffWeeks < 4) return `${diffWeeks}${t('addedWeeksAgo')}`;
      if (diffMonths === 1) return "1个月前添加";
      return `${diffMonths}${t('addedMonthsAgo')}`;
    } else {
      if (diffMins < 1) return t('addedJustNow');
      if (diffMins < 60) return `${t('added')} ${diffMins} ${t('addedMinutesAgo')}`;
      if (diffHours < 24) return `${t('added')} ${diffHours} ${t('addedHoursAgo')}`;
      if (diffDays === 1) return `${t('added')} 1 day ago`;
      if (diffDays === 2) return `${t('added')} 2 days ago`;
      if (diffDays < 7) return `${t('added')} ${diffDays} ${t('addedDaysAgo')}`;
      if (diffWeeks === 1) return `${t('added')} 1 week ago`;
      if (diffWeeks < 4) return `${t('added')} ${diffWeeks} ${t('addedWeeksAgo')}`;
      if (diffMonths === 1) return `${t('added')} 1 month ago`;
      return `${t('added')} ${diffMonths} ${t('addedMonthsAgo')}`;
    }
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
              title={copied ? t('copied') : t('copy')}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <button
              className="icon-button"
              onClick={() => onEdit(command)}
              title={t('edit')}
            >
              <Edit2 size={18} />
            </button>
            <button
              className="icon-button delete-button"
              onClick={() => command.id && onDelete(command.id)}
              title={t('delete')}
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
