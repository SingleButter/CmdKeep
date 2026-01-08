import { useState, useEffect } from "react";
import { Command } from "../types";
import { X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface AddCommandModalProps {
  command: Command | null;
  onClose: () => void;
  onSave: (command: Command) => void;
}

function AddCommandModal({ command, onClose, onSave }: AddCommandModalProps) {
  const { t } = useLanguage();
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
      alert(t('saveFailed') + 'All required fields must be filled');
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
          <h2>{command ? t('editCommandTitle') : t('addCommandTitle')}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">{t('commandTitle')} *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">{t('commandCategory')} *</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="command">{t('commandCommand')} *</label>
            <textarea
              id="command"
              value={commandText}
              onChange={(e) => setCommandText(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">{t('commandDescription')}</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="button-secondary" onClick={onClose}>
              {t('cancel')}
            </button>
            <button type="submit" className="button-primary">
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCommandModal;
