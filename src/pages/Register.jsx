import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data, originalImage } = location.state || {};

    // Debug log pour voir les données reçues
    console.log('Results state:', location.state);
    console.log('Data received:', data);
    console.log('Original image:', originalImage);

    // Redirection si pas de données
    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
                <div className="text-center text-violet-300">
                    <p>No data available</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 px-6 py-2 bg-violet-800 rounded-lg hover:bg-violet-700"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4"
             style={{
                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://i.pinimg.com/736x/7a/c6/cf/7ac6cf31bd5b48045274a50f66609c9b.jpg')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
             }}>
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#1a1a2e]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#30305a]">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Extracted Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Original Image */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-violet-200">Original Image</h3>
                            {originalImage && (
                                <img
                                    src={originalImage}
                                    alt="Original ID"
                                    className="w-full rounded-lg shadow-lg border border-[#30305a]"
                                />
                            )}
                        </div>

                        {/* Extracted Data */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-violet-200">ID Card Details</h3>
                            <div className="space-y-4">
                                <div className="bg-[#16213e]/80 p-4 rounded-lg border border-[#30305a]">
                                    <p className="text-sm text-violet-300">Nom</p>
                                    <p className="text-lg text-white">{data.data?.nom || 'N/A'}</p>
                                </div>
                                <div className="bg-[#16213e]/80 p-4 rounded-lg border border-[#30305a]">
                                    <p className="text-sm text-violet-300">Prénom</p>
                                    <p className="text-lg text-white">{data.data?.prenom || 'N/A'}</p>
                                </div>
                                <div className="bg-[#16213e]/80 p-4 rounded-lg border border-[#30305a]">
                                    <p className="text-sm text-violet-300">Date de naissance</p>
                                    <p className="text-lg text-white">{data.data?.date_naissance || 'N/A'}</p>
                                </div>
                                <div className="bg-[#16213e]/80 p-4 rounded-lg border border-[#30305a]">
                                    <p className="text-sm text-violet-300">Numéro CIN</p>
                                    <p className="text-lg text-white">{data.data?.numero_id || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-gradient-to-r from-violet-800 to-indigo-900 text-white rounded-lg
                                     hover:from-violet-700 hover:to-indigo-800 transition-all duration-300
                                     transform hover:scale-[1.02] shadow-lg border border-violet-700/50"
                        >
                            Scan Another ID
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;