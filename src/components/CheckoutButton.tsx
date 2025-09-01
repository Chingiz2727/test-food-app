import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CheckoutModal from './CheckoutModal';

type CheckoutButtonProps = {
  onCheckout: () => void;
};

export default function CheckoutButton({ onCheckout }: CheckoutButtonProps) {
  const { getTotalPrice, getTotalItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  // Debug: log cart state
  console.log('CheckoutButton - totalItems:', totalItems);
  console.log('CheckoutButton - totalPrice:', totalPrice);

  if (totalItems === 0) {
    console.log('CheckoutButton - returning null (no items)');
    return null;
  }

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOrderConfirm = (sector: string, row: string, seat: string) => {
    console.log('Order confirmed:', { sector, row, seat });
    // Here you would typically send the order to your backend
    alert(`Заказ оформлен! Сектор: ${sector}, Ряд: ${row}, Место: ${seat}`);
    setIsModalOpen(false);
    onCheckout(); // Clear cart or redirect
  };

  return (
    <>
      <div className="fixed bottom-32 left-0 right-0 z-[9999] px-4 pb-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleCheckoutClick}
            className="checkout-button w-full flex items-center justify-between"
          >
            <span>Оформить заказ</span>
            <span className="text-lg">
              {totalPrice.toLocaleString()} ₸ ({totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'})
            </span>
          </button>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleOrderConfirm}
      />
    </>
  );
}
