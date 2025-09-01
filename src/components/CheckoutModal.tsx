import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (sector: string, row: string, seat: string) => void;
};

// Mock sectors data
const sectors = [
  { id: "A", name: "Сектор A" },
  { id: "B", name: "Сектор B" },
  { id: "C", name: "Сектор C" },
  { id: "D", name: "Сектор D" },
  { id: "E", name: "Сектор E" },
  { id: "F", name: "Сектор F" },
];

export default function CheckoutModal({ isOpen, onClose, onConfirm }: CheckoutModalProps) {
  const { getTotalPrice, getTotalItems, cartItems } = useCart();
  const [selectedSector, setSelectedSector] = useState("");
  const [row, setRow] = useState("");
  const [seat, setSeat] = useState("");
  const [showSectorPicker, setShowSectorPicker] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleConfirm = () => {
    if (!selectedSector || !row || !seat) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    onConfirm(selectedSector, row, seat);
  };

  const handleClose = () => {
    setSelectedSector("");
    setRow("");
    setSeat("");
    setShowSectorPicker(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-surface rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Оформление заказа</h2>
          <button
            onClick={handleClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-surface-light rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-3">Ваш заказ</h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-text-secondary">
                <span>{item.name} × {item.quantity}</span>
                <span className="text-secondary font-semibold">
                  {(item.price * item.quantity).toLocaleString()} ₸
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-3">
            <div className="flex justify-between text-text-primary font-bold">
              <span>Итого ({totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'}):</span>
              <span className="text-secondary text-lg">{totalPrice.toLocaleString()} ₸</span>
            </div>
          </div>
        </div>

        {/* Location Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Укажите место доставки</h3>
          
          {/* Sector Selector */}
          <div className="relative">
            <label className="block text-text-secondary text-sm mb-2">Сектор</label>
            <button
              type="button"
              onClick={() => setShowSectorPicker(!showSectorPicker)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-light border border-border hover:border-primary transition-colors text-left"
            >
              <span className={selectedSector ? "text-text-primary" : "text-text-muted"}>
                {selectedSector ? sectors.find(s => s.id === selectedSector)?.name : "Выберите сектор"}
              </span>
              <span className="text-text-muted">▾</span>
            </button>
            
            {showSectorPicker && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface-light border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                {sectors.map((sector) => (
                  <button
                    key={sector.id}
                    type="button"
                    className={`w-full text-left px-4 py-3 hover:bg-surface transition-colors ${
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
            <label className="block text-text-secondary text-sm mb-2">Ряд</label>
            <input
              type="text"
              value={row}
              onChange={(e) => setRow(e.target.value)}
              placeholder="Введите номер ряда"
              className="w-full p-3 rounded-lg bg-surface-light border border-border focus:border-primary focus:outline-none text-text-primary placeholder-text-muted"
            />
          </div>

          {/* Seat Input */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">Место</label>
            <input
              type="text"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              placeholder="Введите номер места"
              className="w-full p-3 rounded-lg bg-surface-light border border-border focus:border-primary focus:outline-none text-text-primary placeholder-text-muted"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 py-3 px-4 rounded-lg border border-border text-text-secondary hover:bg-surface-light transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-lg bg-primary hover:bg-primary-light text-text-primary font-semibold transition-colors"
          >
            Подтвердить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
