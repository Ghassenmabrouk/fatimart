import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                // TODO: Implement checkout
                alert('Checkout functionality coming soon!');
              }}
              disabled={items.length === 0}
              className="mt-4 w-full rounded-lg bg-pink-500 py-2 text-white hover:bg-pink-600 disabled:opacity-50"
            >
              Checkout
            </button>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="mt-2 w-full text-sm text-gray-500 hover:text-gray-700"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};