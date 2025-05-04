import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Check, Copy, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import appFirebase from "../firebase.ts";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface Item {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  onerilen: string;
  detaylar: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Item | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const db = getFirestore(appFirebase);
      const productDoc = doc(db, 'urunler', id!);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        setProduct({ id: productSnapshot.id, ...productSnapshot.data() } as Item);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-12">Ürün bulunamadı</div>;
  }

  const handleAddToCart = () => {
    if (product.category === 'giyim' && !selectedSize) {
      alert('Lütfen bir beden seçin');
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        //id: parseInt(product.id, 10),
        id: product.id,

        name: product.name,
        price: parseFloat(product.price),
        quantity: quantity,
        image: product.image
      }
    });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link kopyalandı!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110">
            <Heart className="w-6 h-6 text-red-500" />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </div>
            <span className="text-gray-500">|</span>
            <div className="flex space-x-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Facebook className="w-5 h-5 mr-1" />
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Twitter className="w-5 h-5 mr-1" />
                X
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${product.name}&summary=${product.description}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5 mr-1" />
                Linkedin
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(product.name)} - ${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                Whatsapp
              </a>
              <button
                onClick={handleCopyLink}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Copy className="w-5 h-5 mr-1" />
                Link Kopyala
              </button>
            </div>
          </div>

          <p className="text-3xl font-bold text-purple-600 animate-fadeIn">{product.price} TL</p>

          <p className="text-gray-600">{product.description}</p>

          {product.category === 'giyim' && (
            <div className="animate-fadeIn">
              <h3 className="text-lg font-semibold mb-2">Beden</h3>
              <div className="flex space-x-4">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedSize === size
                        ? 'border-purple-600 text-purple-600 transform scale-110'
                        : 'border-gray-300 text-gray-600'
                    } hover:border-purple-600 hover:text-purple-600 transition-all duration-300`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}



          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-purple-600 text-white rounded-full flex items-center justify-center space-x-2 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            {showAddedMessage ? (
              <>
                <Check className="w-5 h-5" />
                <span>Sepete Eklendi!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Sepete Ekle</span>
              </>
            )}
          </button>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Ürün Detayları</h3>
            <ul className="space-y-2 text-gray-600">
              <li>{product.detaylar}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;