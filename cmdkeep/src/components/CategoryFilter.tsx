import { Folder, List, Code, Database, Cloud } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
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
    <div className="category-filter">
      <h3 className="category-title">
        <Folder size={18} />
        分类
      </h3>
      <div className="category-list">
        <button
          className={`category-item ${selectedCategory === null ? "active" : ""}`}
          onClick={() => onCategoryChange(null)}
        >
          <List size={16} />
          全部
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
  );
}

export default CategoryFilter;
