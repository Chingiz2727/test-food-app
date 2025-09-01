import { useEffect, useState } from 'react';
import { getFoodItems, type FoodItem } from '../../api/food';
import { PageHeader } from '../../components';
import FoodCard from '../../components/FoodCard';
import CheckoutButton from '../../components/CheckoutButton';
import { useCart } from '../../contexts/CartContext';

type Props = {
  onBack: () => void;
};

export default function FoodPage({ onBack }: Props) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getTotalItems } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    
    getFoodItems()
      .then(list => { if (!cancelled) setFoodItems(list); })
      .catch(error => !cancelled && setError(String(error)))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, []);

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    alert('Функция оформления заказа будет добавлена позже!');
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

  return (
    <div className="w-full pb-40">
      <PageHeader title="Меню" onBack={onBack} />
      
      <div className="grid grid-cols-2 gap-4">
        {foodItems.map((food) => (
          <FoodCard key={food.id} food={food} />
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
