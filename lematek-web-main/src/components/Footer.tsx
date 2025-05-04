import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">LEMATEK</h3>
            <p className="text-gray-400">En kaliteli ürünler, en uygun fiyatlarla.</p>
            <div className="flex space-x-4 mt-4">
             <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/company/lematechs/'> <Linkedin  className="w-6 h-6 cursor-pointer hover:text-purple-500 transition-colors" /> </a>
             <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/lematechs/'> <Instagram className="w-6 h-6 cursor-pointer hover:text-purple-500 transition-colors" /> </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">İletişim</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>lemateksoftware@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Kayseri, Türkiye</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-purple-500 transition-colors">Hakkımızda</Link></li>
              <li><Link to="/politika" className="hover:text-purple-500 transition-colors">Gizlilik Politikası</Link></li>
              <li><Link to="/iade" className="hover:text-purple-500 transition-colors">İade Koşulları</Link></li>
              <li><Link to="/sss" className="hover:text-purple-500 transition-colors">SSS</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025-Günümüz LEMATEK. Tüm hakları saklıdır. Bu site  <a target="_blank" className="text-purple-500 transition-colors" rel="noopener noreferrer" href='https://spaceteknopoliweb.vercel.app/'>Space Teknopoli</a> işbirliği ile geliştirilmiştir.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;