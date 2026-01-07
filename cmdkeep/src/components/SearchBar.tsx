import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        placeholder="搜索命令、标题或说明..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
    </form>
  );
}

export default SearchBar;
