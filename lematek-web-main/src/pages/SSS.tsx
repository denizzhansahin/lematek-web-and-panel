import React from 'react';

const SSS: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
                    Sıkça Sorulan Sorular
                </h1>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Soru 1: Bu proje nedir?</h2>
                    <p className="text-lg text-gray-700">Cevap: Bu proje, örnek bir SSS sayfası oluşturmak için hazırlanmıştır.</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Soru 2: Nasıl kullanılır?</h2>
                    <p className="text-lg text-gray-700">Cevap: Bu sayfayı kullanarak sıkça sorulan soruları ve cevaplarını listeleyebilirsiniz.</p>
                </div>
                {/* Daha fazla soru ve cevap ekleyebilirsiniz */}
            </div>
        </div>
    );
};

export default SSS;