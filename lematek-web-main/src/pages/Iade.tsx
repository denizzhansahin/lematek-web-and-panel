import React from 'react';

const Iade: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
                    İade Koşulları
                </h1>
                <ul className="list-disc list-inside text-lg text-gray-700">
                    <li className="mb-2">Ürünler orijinal ambalajında ve kullanılmamış olmalıdır.</li>
                    <li className="mb-2">İade süresi, teslimat tarihinden itibaren 14 gündür.</li>
                    <li className="mb-2">İade işlemi için fatura veya sipariş numarası gereklidir.</li>
                    <li className="mb-2">İade kargo ücreti müşteri tarafından karşılanır.</li>
                    <li className="mb-2">İade edilen ürünler kontrol edildikten sonra ücret iadesi yapılır.</li>
                </ul>
            </div>
        </div>
    );
};

export default Iade;