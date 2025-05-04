import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Product } from '../types';

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [onerilen, setOnerilen] = useState(product.onerilen);
  const { updateItem } = useFirestore<Product>('urunler');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateItem(product.id, { name, price, category, description, image, onerilen });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Ürün Düzenle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Ürün Adı</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fiyat</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kategori</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Açıklama</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Resim URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Önerilen</label>
            <select
              value={onerilen}
              onChange={(e) => setOnerilen(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;