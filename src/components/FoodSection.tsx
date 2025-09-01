import { useState } from 'react';
import type { FoodItem, FoodCategory } from '../api/food';
import FoodCard from './FoodCard';

type FoodSectionProps = {
  category: FoodCategory;
  foods: FoodItem[];
};

export default function FoodSection({ category, foods }: FoodSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (foods.length === 0) return null;

  return (
    <div className="food-section mb-8">
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="food-section-header flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-3">
          <span className="food-section-icon">{category.icon}</span>
          <h2 className="food-section-title">{category.name}</h2>
          <span className="food-section-count">({foods.length})</span>
        </div>
        <span className={`food-section-arrow transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
          ▼
        </span>
      </button>
      
      {/* Food Items Grid */}
      <div className={`food-section-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="food-grid">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
}
