import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Watch, Shirt, Camera } from 'lucide-react';
import appFirebase from "../firebase.ts";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Watch: <Watch className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
};

const Categories = () => {
  const [categories, setCategories] = useState<Item[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const db = getFirestore(appFirebase);
      const categoriesCollection = collection(db, 'kategoriler');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Item[];
      setCategories(categoriesList);
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12 animate-fadeIn">Kategoriler</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow animate-fadeIn"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-2">
                {iconMap[category.icon]}
                <h2 className="text-2xl font-bold">{category.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <Link
                to={`/category/${category.id}`}
                className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                İncele
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;