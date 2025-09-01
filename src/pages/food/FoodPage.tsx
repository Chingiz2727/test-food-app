import { useEffect, useState } from 'react';
import { getFoodItems, getFoodCategories, type FoodItem, type FoodCategory } from '../../api/food';
import { PageHeader, FoodSection } from '../../components';
import CheckoutButton from '../../components/CheckoutButton';
import { useCart } from '../../contexts/CartContext';

type Props = {
  onBack: () => void;
};

export default function FoodPage({ onBack }: Props) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getTotalItems } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    
    Promise.all([
      getFoodItems(),
      getFoodCategories()
    ])
      .then(([foods, cats]) => { 
        if (!cancelled) {
          setFoodItems(foods);
          setCategories(cats);
        }
      })
      .catch(error => !cancelled && setError(String(error)))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, []);

  const handleCheckout = () => {
    // This will be called after successful order confirmation
    console.log('Checkout completed - cart cleared');
  };

  // Debug: log total items
  const totalItems = getTotalItems();

  if (loading) {
    return (
      <div className="w-full">
        <PageHeader title="Меню" onBack={onBack} />
        <div className="text-center text-white/60 py-8">Загрузка меню...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <PageHeader title="Меню" onBack={onBack} />
        <div className="text-center text-red-400 py-8">Ошибка: {error}</div>
      </div>
    );
  }

  // Group foods by category
  const foodsByCategory = categories.map(category => ({
    category,
    foods: foodItems.filter(food => food.category === category.id)
  }));

  return (
    <div className="w-full pb-40">
      <PageHeader title="Меню" onBack={onBack} />
      
      {/* Food Sections */}
      <div className="space-y-8">
        {foodsByCategory.map(({ category, foods }) => (
          <FoodSection key={category.id} category={category} foods={foods} />
        ))}
      </div>
      
      {/* Debug: show total items */}
      <div className="text-center text-white/60 mt-4">
        Товаров в корзине: {totalItems}
      </div>
      
      <CheckoutButton onCheckout={handleCheckout} />
    </div>
  );
}
