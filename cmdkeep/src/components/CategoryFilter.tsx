import { Folder, List, Code, Database, Cloud } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import SettingsMenu from "./SettingsMenu";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { t } = useLanguage();
  const getCategoryIcon = (category: string) => {
    const iconSize = 16;
    switch (category.toLowerCase()) {
      case "git":
        return <Code size={iconSize} />;
      case "docker":
        return <Database size={iconSize} />;
      case "kubernetes":
        return <Cloud size={iconSize} />;
      default:
        return <Folder size={iconSize} />;
    }
  };

  return (
    <>
      <div className="category-filter">
        <h3 className="category-title">
          <Folder size={18} />
          {t('categories')}
        </h3>
        <div className="category-list">
          <button
            className={`category-item ${selectedCategory === null ? "active" : ""}`}
            onClick={() => onCategoryChange(null)}
          >
            <List size={16} />
            {t('allCategories')}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-item ${selectedCategory === category ? "active" : ""}`}
              onClick={() => onCategoryChange(category)}
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>
      </div>
      <SettingsMenu />
    </>
  );
}

export default CategoryFilter;
