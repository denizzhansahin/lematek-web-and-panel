import React, { useEffect, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import appFirebase from "../firebase.ts";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import Logo from "../image/logo.png"


interface Item {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  onerilen: string;
}

const Home = () => {
  const [products, setProducts] = useState<Item[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Item[]>([]);

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

      const featured = productsList.filter(product => product.onerilen === 'Evet');
      setFeaturedProducts(featured);
    };

    fetchProducts();
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
         
          <div className="text-white">
          <img src={Logo} alt="Logo" className="w-32 h-32 mb-4" />
            <h1 className="text-5xl font-bold mb-4 animate-slideIn">
              Burası Teknolojinin Adresi!
            </h1>
            <p className="text-xl mb-8 animate-slideIn animation-delay-200">
              En İyi Teknolojilerle Tanışmak İçin Doğru Adrestesiniz!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition-colors animate-slideIn animation-delay-400"
            >
              Alışverişe Başla
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Ürünler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>,
    title: "Kalite Garantisi",
    description: "Tüm ürünlerimiz kalite kontrolünden geçmektedir"
  },
  {
    icon: <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>,
    title: "Hızlı Teslimat",
    description: "Siparişleriniz 24 saat içinde kargoya verilir"
  },
  {
    icon: <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>,
    title: "Güvenli Alışveriş",
    description: "En iyi ürünleri güvenle alın"
  }
];

export default Home;