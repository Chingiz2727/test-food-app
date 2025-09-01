import { useCart } from '../contexts/CartContext';

type CheckoutButtonProps = {
  onNavigateToCheckout: () => void;
};

export default function CheckoutButton({ onNavigateToCheckout }: CheckoutButtonProps) {
  const { getTotalPrice, getTotalItems } = useCart();
  
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  // Debug: log cart state
  console.log('CheckoutButton - totalItems:', totalItems);
  console.log('CheckoutButton - totalPrice:', totalPrice);

  if (totalItems === 0) {
    console.log('CheckoutButton - returning null (no items)');
    return null;
  }

  return (
    <div className="fixed bottom-32 left-0 right-0 z-[9999] px-6 pb-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onNavigateToCheckout}
          className="checkout-button w-full flex items-center justify-between"
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
