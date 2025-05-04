import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  onerilen:string
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [products, setProducts] = useState<Item[]>([]);

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
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (priceRange === 'low' && Number(product.price) > 500) return false;
    if (priceRange === 'mid' && (Number(product.price) <= 500 || Number(product.price) > 1000)) return false;
    if (priceRange === 'high' && Number(product.price) <= 1000) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ürünlerimiz</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Filtrele</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
                <option value="all">Tümü</option>
                {Array.from(new Set(products.map(product => product.category))).map(category => (
                <option key={category} value={category}>{category}</option>
                ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat Aralığı</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">Tümü</option>
              <option value="low">500 TL altı</option>
              <option value="mid">500 TL - 1000 TL</option>
              <option value="high">1000 TL üzeri</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
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

export default Products;