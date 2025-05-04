import React, { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Category } from '../types';

interface EditCategoryModalProps {
  category: Category;
  onClose: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, onClose }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [id, setId] = useState(category.id);
  const [icon, setIcon] = useState(category.icon);
  const [image, setImage] = useState(category.image);
  const { updateItem } = useFirestore<Category>('kategoriler');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateItem(category.id, { name, description, icon, image, id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Kategori Düzenle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Kategori Adı</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kategori Id</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
            <label className="block text-gray-700">İkon</label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
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

export default EditCategoryModal;
