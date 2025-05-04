import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import appFirebase from "../firebase.ts";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const Cart = () => {
  const { state, dispatch } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });

/*
  const handleQuantityChange1 = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id }); // Ürün miktarı 0 olursa ürünü kaldır
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const handleRemoveItem1 = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
*/

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };
  
  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const db = getFirestore(appFirebase);
    const ordersCollection = collection(db, 'siparisler');
    const ordersSnapshot = await getDocs(ordersCollection);
    const orderNumber = ordersSnapshot.size + 1;
    const orderId = `siparis_${orderNumber}`;

    const orderData = {
      customer: formData,
      items: state.items,
      total: state.total,
      date: new Date().toISOString()
    };

    //await addDoc(ordersCollection, { ...orderData, id: orderId });
    await addDoc(ordersCollection, { ...orderData});

    dispatch({ type: 'CLEAR_CART' });
    setShowCheckoutForm(false);
    alert('Siparişiniz başarıyla alındı!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Sepetiniz Boş</h2>
        <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünlerimize göz atın.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8">Sepetim</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow animate-slideIn"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-purple-600 font-bold">{item.price} TL</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 bg-red-200 rounded-full hover:bg-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="space-y-2 mb-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} TL</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Toplam</span>
                <span>{state.total.toFixed(2)} TL</span>
              </div>
            </div>
            <button
              onClick={() => setShowCheckoutForm(true)}
              className="w-full mt-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Siparişi Tamamla
            </button>
          </div>
        </div>
      </div>

      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Teslimat Bilgileri</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  Siparişi Onayla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
