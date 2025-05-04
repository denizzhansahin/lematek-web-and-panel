import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ShoppingBag, Tag, HeadphonesIcon, Plus, Trash2, Edit, Search, Loader2, Package, MapPin, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useFirestore } from './hooks/useFirestore';
import { Product, Category, Order, SupportTicket } from './types';
import AddCategoryModal from './components/AddCategoryModal';
import AddProductModal from './components/AddProductModal';
import EditCategoryModal from './components/EditCategoryModal';
import EditProductModal from './components/EditProductModal';

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | Category | null>(null);

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    deleteItem: deleteProduct,
    updateItem: updateProduct
  } = useFirestore<Product>('urunler');

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
    deleteItem: deleteCategory,
    updateItem: updateCategory
  } = useFirestore<Category>('kategoriler');

  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
    deleteItem: deleteOrder
  } = useFirestore<Order>('siparisler');

  const {
    data: supportTickets,
    loading: ticketsLoading,
    error: ticketsError,
    deleteItem: deleteTicket
  } = useFirestore<SupportTicket>('destek_talepleri');

  const tabs = [
    { id: 'products', icon: ShoppingBag, label: 'Ürünler' },
    { id: 'categories', icon: Tag, label: 'Kategoriler' },
    { id: 'orders', icon: Database, label: 'Siparişler' },
    { id: 'support', icon: HeadphonesIcon, label: 'Destek Talepleri' },
  ];

  const getActiveData = useCallback(() => {
    switch (activeTab) {
      case 'products':
        return {
          data: products,
          loading: productsLoading,
          error: productsError,
          deleteItem: deleteProduct,
          updateItem: updateProduct,
          columns: ['ID', 'Ürün', 'Kategori', 'Fiyat', 'Önerilen', 'İşlemler']
        };
      case 'categories':
        return {
          data: categories,
          loading: categoriesLoading,
          error: categoriesError,
          deleteItem: deleteCategory,
          updateItem: updateCategory,
          columns: ['ID', 'Kategori', 'Açıklama', 'İkon', 'Resim', 'İşlemler']
        };
      case 'orders':
        return {
          data: orders,
          loading: ordersLoading,
          error: ordersError,
          deleteItem: deleteOrder,
          columns: ['ID', 'Müşteri Bilgileri', 'Sipariş Detayı', 'Toplam', 'Tarih', 'İşlemler']
        };
      case 'support':
        return {
          data: supportTickets,
          loading: ticketsLoading,
          error: ticketsError,
          deleteItem: deleteTicket,
          columns: ['ID', 'Müşteri', 'Konu', 'Mesaj', 'Tarih', 'İşlemler']
        };
      default:
        return {
          data: [],
          loading: false,
          error: null,
          deleteItem: () => {},
          columns: []
        };
    }
  }, [activeTab, products, categories, orders, supportTickets]);

  const { data, loading, error, deleteItem, updateItem, columns } = getActiveData();

  const filteredData = data.filter((item: any) => {
    const searchLower = searchTerm.toLowerCase();
    return Object.values(item).some(value => 
      value && value.toString().toLowerCase().includes(searchLower)
    );
  });

  const handleEdit = (item: Product | Category) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  /*
  const handleDelete = (id: string) => {
    console.log(id)
    deleteItem(id);
  };
  */
 // App.tsx'deki handleDelete fonksiyonunu güncelleyin
const handleDelete = (documentId: string) => { // Artık doğrudan doküman ID'sini alıyor
  deleteItem(documentId); // Firestore doküman ID'sini kullan
};

  const renderTableContent = (item: any) => {
    switch (activeTab) {
      case 'products':
        return (
          <>
            <div className="text-sm text-gray-600">#{item.id.slice(0, 6)}</div>
            <div className="flex items-center space-x-3">
              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">{item.category}</div>
            <div className="font-medium">{item.price} ₺</div>
            <div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.onerilen === 'Evet' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {item.onerilen}
              </span>
            </div>
          </>
        );
      case 'categories':
        return (
          <>
            <div className="text-sm text-gray-600">#{item.id.slice(0, 6)}</div>
            <div className="flex items-center space-x-3">
              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
              <div className="font-medium">{item.name}</div>
            </div>
            <div className="text-sm text-gray-500">{item.description}</div>
            <div className="text-sm text-gray-500">{item.icon}</div>
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
          </>
        );
      case 'orders':
        return (
          <>
            <div className="text-sm text-gray-600">#{item.id.slice(0, 6)}</div>
            <div className="space-y-1">
              <div className="font-medium">{item.customer.firstName} {item.customer.lastName}</div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                {item.customer.city}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Mail size={14} className="mr-1" />
                {item.customer.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone size={14} className="mr-1" />
                {item.customer.phone}
              </div>
            </div>
            <div className="space-y-2">
              {item.items.map((orderItem: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <img src={orderItem.image} alt={orderItem.name} className="w-8 h-8 rounded object-cover" />
                  <div>
                    <div className="text-sm font-medium">{orderItem.name}</div>
                    <div className="text-xs text-gray-500">{orderItem.quantity}x {orderItem.price} ₺</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="font-medium text-blue-600">{item.total} ₺</div>
            <div className="text-sm text-gray-500">
              {format(new Date(item.date), 'dd MMMM yyyy HH:mm:ss', { locale: tr })}
            </div>
          </>
        );
      case 'support':
        return (
          <>
            <div className="text-sm text-gray-600">#{item.id.slice(0, 6)}</div>
            <div className="space-y-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">{item.email}</div>
            </div>
            <div className="font-medium text-gray-800">{item.subject}</div>
            <div className="text-sm text-gray-500 truncate max-w-xs">{item.message}</div>
            <div className="text-sm text-gray-500">
            {format(new Date(item.date), 'dd MMMM yyyy HH:mm:ss', { locale: tr })}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-6 py-4 flex items-center space-x-3 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={20} />
            <span>Yeni Ekle</span>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-blue-600" size={32} />
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 mb-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
                  {columns.map((column) => (
                    <div key={column}>{column}</div>
                  ))}
                </div>

                {/* Table Content */}
                {filteredData.map((item: any) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-6 gap-4 px-4 py-3 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors"
                  >
                    {renderTableContent(item)}
                    <div className="flex justify-end space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                {filteredData.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Gösterilecek veri bulunamadı
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        activeTab === 'products' ? (
          <AddProductModal onClose={() => setIsAddModalOpen(false)} />
        ) : activeTab === 'categories' ? (
          <AddCategoryModal onClose={() => setIsAddModalOpen(false)} />
        ) : null
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedItem && (
        activeTab === 'products' ? (
          <EditProductModal product={selectedItem as Product} onClose={() => setIsEditModalOpen(false)} />
        ) : activeTab === 'categories' ? (
          <EditCategoryModal category={selectedItem as Category} onClose={() => setIsEditModalOpen(false)} />
        ) : null
      )}
    </div>
  );
}

export default App;