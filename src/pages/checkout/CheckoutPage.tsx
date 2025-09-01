import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { PageHeader } from '../../components';

// Mock sectors data
const sectors = [
  { id: "A", name: "Сектор A" },
  { id: "B", name: "Сектор B" },
  { id: "C", name: "Сектор C" },
  { id: "D", name: "Сектор D" },
  { id: "E", name: "Сектор E" },
  { id: "F", name: "Сектор F" },
];

type CheckoutPageProps = {
  onBack: () => void;
  onNavigateToMain: () => void;
};

export default function CheckoutPage({ onBack, onNavigateToMain }: CheckoutPageProps) {
  const { getTotalPrice, getTotalItems, cartItems, clearCart } = useCart();
  const [selectedSector, setSelectedSector] = useState("");
  const [row, setRow] = useState("");
  const [seat, setSeat] = useState("");
  const [showSectorPicker, setShowSectorPicker] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  // Redirect to main if cart is empty
  if (totalItems === 0) {
    onNavigateToMain();
    return null;
  }

  const handleConfirm = () => {
    if (!selectedSector || !row || !seat) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    // Show success message
    alert(`✅ Заказ успешно оформлен!\n\n📍 Место доставки:\nСектор: ${selectedSector}\nРяд: ${row}\nМесто: ${seat}\n\n💰 Сумма: ${totalPrice.toLocaleString()} ₸\n\nСпасибо за заказ!`);
    
    // Clear the cart
    clearCart();
    console.log('Cart cleared after order confirmation');
    
    // Navigate back to main page
    onNavigateToMain();
  };

  return (
    <div className="w-full pb-40">
      <PageHeader title="Оформление заказа" onBack={onBack} />
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Order Summary */}
        <div className="bg-surface-light rounded-2xl p-6 border border-border">
          <h3 className="text-xl font-bold text-text-primary mb-4">Ваш заказ</h3>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-semibold text-text-primary">{item.name}</div>
                    <div className="text-sm text-text-secondary">Количество: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-secondary">
                    {(item.price * item.quantity).toLocaleString()} ₸
                  </div>
                  <div className="text-sm text-text-secondary">
                    {item.price.toLocaleString()} ₸ за шт.
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-text-primary">
                Итого ({totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'}):
              </span>
              <span className="text-2xl font-bold text-secondary">
                {totalPrice.toLocaleString()} ₸
              </span>
            </div>
          </div>
        </div>

        {/* Location Selection */}
        <div className="bg-surface-light rounded-2xl p-6 border border-border">
          <h3 className="text-xl font-bold text-text-primary mb-4">Место доставки</h3>
          
          <div className="space-y-4">
            {/* Sector Selector */}
            <div className="relative">
              <label className="block text-text-secondary text-sm mb-2 font-medium">Сектор</label>
              <button
                type="button"
                onClick={() => setShowSectorPicker(!showSectorPicker)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-surface border border-border hover:border-primary transition-colors text-left"
              >
                <span className={selectedSector ? "text-text-primary" : "text-text-muted"}>
                  {selectedSector ? sectors.find(s => s.id === selectedSector)?.name : "Выберите сектор"}
                </span>
                <span className="text-text-muted">▾</span>
              </button>
              
              {showSectorPicker && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-lg z-10 max-h-48 overflow-auto">
                  {sectors.map((sector) => (
                    <button
                      key={sector.id}
                      type="button"
                      className={`w-full text-left px-4 py-3 hover:bg-surface-light transition-colors ${
                        selectedSector === sector.id 
                          ? "bg-primary text-text-primary" 
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                      onClick={() => {
                        setSelectedSector(sector.id);
                        setShowSectorPicker(false);
                      }}
                    >
                      {sector.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Row Input */}
            <div>
              <label className="block text-text-secondary text-sm mb-2 font-medium">Ряд</label>
              <input
                type="text"
                value={row}
                onChange={(e) => setRow(e.target.value)}
                placeholder="Введите номер ряда"
                className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-text-primary placeholder-text-muted"
              />
            </div>

            {/* Seat Input */}
            <div>
              <label className="block text-text-secondary text-sm mb-2 font-medium">Место</label>
              <input
                type="text"
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                placeholder="Введите номер места"
                className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-text-primary placeholder-text-muted"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 px-6 rounded-xl border border-border text-text-secondary hover:bg-surface-light transition-colors font-semibold"
          >
            Назад
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-4 px-6 rounded-xl bg-primary hover:bg-primary-light text-text-primary font-semibold transition-colors"
          >
            Подтвердить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
