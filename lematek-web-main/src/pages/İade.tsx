import React from 'react';

const Iade: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">İade Koşulları</h1>
                <ul className="list-disc list-inside">
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
