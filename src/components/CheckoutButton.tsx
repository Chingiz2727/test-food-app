import { useCart } from '../contexts/CartContext';

type CheckoutButtonProps = {
  onCheckout: () => void;
};

export default function CheckoutButton({ onCheckout }: CheckoutButtonProps) {
  const { getTotalPrice, getTotalItems } = useCart();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-32 left-0 right-0 z-[9999] px-4 pb-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onCheckout}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-xl shadow-lg transition-colors flex items-center justify-between"
        >
          <span>Оформить заказ</span>
          <span className="text-lg">
            {totalPrice.toLocaleString()} ₸ ({totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'})
          </span>
        </button>
      </div>
    </div>
  );
}
