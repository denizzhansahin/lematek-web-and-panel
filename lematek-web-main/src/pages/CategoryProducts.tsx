import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Filter } from 'lucide-react';

import appFirebase from "../firebase.ts";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Item {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  onerilen: string;
}

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Item[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore(appFirebase);
      const productsCollection = collection(db, 'urunler');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Item[];
      setProducts(productsList);

      const filtered = productsList.filter(product => product.category === categoryId);
      setFilteredProducts(filtered);
    };

    fetchProducts();
  }, [categoryId]);

  if (filteredProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Bu kategoride ürün bulunamadı</h2>
        <Link to="/categories" className="text-purple-600 hover:text-purple-700">
          Kategorilere Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize animate-fadeIn">
        {categoryId} Kategorisindeki Ürünler
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow animate-fadeIn"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">
                  {product.price} TL
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  İncele
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;