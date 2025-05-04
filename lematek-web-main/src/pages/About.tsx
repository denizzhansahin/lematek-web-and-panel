import React from 'react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
                    Hakkımızda
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                    Biz, yenilikçi çözümler sunan bir teknoloji firmasıyız. Amacımız, müşterilerimize en iyi hizmeti sunarak onların iş süreçlerini kolaylaştırmak ve verimliliklerini artırmaktır.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    Ekibimiz, alanında uzman profesyonellerden oluşmaktadır. Her biri, projelerimizi başarıya ulaştırmak için büyük bir özveriyle çalışmaktadır.
                </p>
                <p className="text-lg text-gray-700">
                    Teknolojinin gücünü kullanarak, müşterilerimize değer katmaya devam ediyoruz. Bizimle çalışarak, siz de bu yolculuğun bir parçası olabilirsiniz.
                </p>
            </div>
        </div>
    );
};

export default About;