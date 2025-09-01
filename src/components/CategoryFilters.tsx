type Category = {
  id: string;
  name: string;
  count: number;
};

type CategoryFiltersProps = {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
};

export default function CategoryFilters({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: CategoryFiltersProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-center">
        <div className="inline-flex gap-3 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] pb-4 px-1 max-w-full">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 hover:bg-white/20 category-btn ${
                selectedCategory === category.id 
                  ? "selected" 
                  : ""
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
