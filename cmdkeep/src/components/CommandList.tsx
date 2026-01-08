import { Command } from "../types";
import CommandItem from "./CommandItem";
import { useLanguage } from "../contexts/LanguageContext";

interface CommandListProps {
  commands: Command[];
  onEdit: (command: Command) => void;
  onDelete: (id: number) => void;
}

function CommandList({ commands, onEdit, onDelete }: CommandListProps) {
  const { t } = useLanguage();

  if (commands.length === 0) {
    return (
      <div className="empty-state">
        <p>{t('noCommands')}</p>
        <p className="empty-hint">{t('addFirstCommand')}</p>
      </div>
    );
  }

  return (
    <div className="command-list">
      {commands.map((command) => (
        <CommandItem
          key={command.id}
          command={command}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CommandList;
