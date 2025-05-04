import React from 'react';

const Politika: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
                    Gizlilik Politikası
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                    Şirketimize hoş geldiniz! En iyi hizmeti sunmaya kendimizi adadık. Ekibimiz, yaptıkları işe tutkulu olan yüksek vasıflı profesyonellerden oluşmaktadır.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    Misyonumuz, müşterilerimizin ihtiyaçlarını karşılayan yüksek kaliteli ürünler sunmaktır. Beklentileri aşmak ve süreçlerimizi sürekli olarak iyileştirmek için çabalıyoruz.
                </p>
                <p className="text-lg text-gray-700">
                    Bizi tercih ettiğiniz için teşekkür ederiz. Sizinle çalışmayı ve hedeflerinize ulaşmanıza yardımcı olmayı dört gözle bekliyoruz.
                </p>
            </div>
        </div>
    );
};

export default Politika;