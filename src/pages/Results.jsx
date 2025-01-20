import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Debug logs
    console.log('Location state:', location.state);

    // Accès correct aux données
    const data = location.state?.data?.data || {};
    const originalImage = location.state?.originalImage;

    // Function to handle navigation
    const handleScanAnother = () => {
        navigate('/', { replace: true }); // Using replace to prevent back button issues
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://i.pinimg.com/736x/b9/49/73/b949733841acc58f736eb8d924c440ba.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-[#1a1a2e]/70 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 border border-[#30305a]">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Extracted Information
                </h2>

                {/* Affichage de l'image originale */}
                {originalImage && (
                    <div className="mb-6">
                        <p className="text-violet-300 text-sm mb-2">Original Image</p>
                        <img 
                            src={originalImage} 
                            alt="ID Card" 
                            className="w-full rounded-lg border border-[#30305a]"
                        />
                    </div>
                )}

                <div className="space-y-4">
                    <div className="bg-[#16213e]/80 p-4 rounded-lg">
                        <p className="text-violet-300 text-sm">Nom</p>
                        <p className="text-white font-medium">{data.nom || 'N/A'}</p>
                    </div>

                    <div className="bg-[#16213e]/80 p-4 rounded-lg">
                        <p className="text-violet-300 text-sm">Prénom</p>
                        <p className="text-white font-medium">{data.prenom || 'N/A'}</p>
                    </div>

                    <div className="bg-[#16213e]/80 p-4 rounded-lg">
                        <p className="text-violet-300 text-sm">Date de naissance</p>
                        <p className="text-white font-medium">{data.date_naissance || 'N/A'}</p>
                    </div>

                    <div className="bg-[#16213e]/80 p-4 rounded-lg">
                        <p className="text-violet-300 text-sm">Numéro ID</p>
                        <p className="text-white font-medium">{data.numero_id || 'N/A'}</p>
                    </div>
                </div>

                <button
                    onClick={handleScanAnother}
                    className="w-full mt-6 bg-gradient-to-r from-violet-800 to-indigo-900 text-white py-3 rounded-lg
                             hover:from-violet-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-[1.02]"
                >
                    Scan Another ID
                </button>
            </div>
        </div>
    );
};

export default Results;