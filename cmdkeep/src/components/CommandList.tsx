import { Command } from "../types";
import CommandItem from "./CommandItem";

interface CommandListProps {
  commands: Command[];
  onEdit: (command: Command) => void;
  onDelete: (id: number) => void;
}

function CommandList({ commands, onEdit, onDelete }: CommandListProps) {
  if (commands.length === 0) {
    return (
      <div className="empty-state">
        <p>暂无命令</p>
        <p className="empty-hint">点击右上角"添加命令"按钮开始添加</p>
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
