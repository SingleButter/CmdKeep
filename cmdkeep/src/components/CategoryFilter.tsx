import { Folder, List } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
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
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
