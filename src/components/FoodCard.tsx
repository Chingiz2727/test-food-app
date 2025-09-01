import type { FoodItem } from '../api/food';
import { useCart } from '../hooks/useCart';

type FoodCardProps = {
  food: FoodItem;
};

export default function FoodCard({ food }: FoodCardProps) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(food.id);

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(food.id);
  };

  return (
    <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-32 object-cover"
        />
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{food.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-sm">
            {food.price.toLocaleString()} ₸
          </span>
          
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-semibold rounded-lg transition-colors"
            >
              Добавить
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleRemoveFromCart}
                className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="text-white text-sm font-semibold min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleAddToCart}
                className="w-6 h-6 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
