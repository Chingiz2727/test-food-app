import type { FoodItem } from '../api/food';
import { useCart } from '../contexts/CartContext';

type FoodCardProps = {
  food: FoodItem;
};

export default function FoodCard({ food }: FoodCardProps) {
  const { addToCart, removeFromCart, getItemQuantity, cartItems } = useCart();
  const quantity = getItemQuantity(food.id);

  // Debug: log cart state for this food item
  console.log(`FoodCard ${food.name} - quantity:`, quantity);
  console.log(`FoodCard ${food.name} - cartItems:`, cartItems);

  const handleAddToCart = () => {
    console.log(`Adding ${food.name} to cart`); // Debug log
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image
    });
  };

  const handleRemoveFromCart = () => {
    console.log(`Removing ${food.name} from cart`); // Debug log
    removeFromCart(food.id);
  };

  return (
    <div className="food-card">
      <div className="food-card-image">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-32 object-cover"
        />
      </div>
      
      <div className="food-card-content">
        <h3 className="food-card-title">{food.name}</h3>
        <div className="flex items-center justify-between">
          <span className="food-card-price">
            {food.price.toLocaleString()} ₸
          </span>
          
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="food-card-button"
            >
              Добавить
            </button>
          ) : (
            <div className="food-card-quantity-controls">
              <button
                onClick={handleRemoveFromCart}
                className="food-card-quantity-btn minus"
              >
                -
              </button>
              <span className="food-card-quantity">
                {quantity}
              </span>
              <button
                onClick={handleAddToCart}
                className="food-card-quantity-btn plus"
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
