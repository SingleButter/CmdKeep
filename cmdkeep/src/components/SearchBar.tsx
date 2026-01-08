import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const { t } = useLanguage();
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
        placeholder={t('searchPlaceholder')}
        value={query}
        onChange={handleChange}
        className="search-input"
      />
    </form>
  );
}

export default SearchBar;
