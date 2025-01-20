// Home.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCamera, setIsCamera] = useState(false);
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setPreview(URL.createObjectURL(file));
        setIsCamera(false);
        console.log('File selected:', file); // Log pour vérifier le fichier sélectionné
    };

    const startCamera = async () => {
        try {
            // Demande explicite d'autorisation
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "environment"  // Utilise la caméra arrière si disponible
                }
            });
            
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCamera(true);
            setPreview('');
            setFile(null);
            
        } catch (err) {
            console.error('Erreur caméra détaillée:', err);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                alert('Permission de caméra refusée. Veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur.');
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                alert('Aucune caméra trouvée sur votre appareil.');
            } else {
                alert('Erreur lors de l\'accès à la caméra : ' + err.message);
            }
        }
    };
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
        setIsCamera(false);
    };

    const captureImage = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setPreview(imageData);
        
        // Convertir base64 en fichier
        const res = await fetch(imageData);
        const blob = await res.blob();
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        setFile(file);
        console.log('Image captured and converted to file:', file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            console.log('Aucun fichier sélectionné');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        setLoading(true);
        try {
            console.log('Envoi de la requête au backend...');
            console.log('Fichier envoyé:', file);
            
            const response = await fetch('http://localhost:8000/predict/image', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
            });
    
            console.log('Réponse du backend:', response);
            
            // Vérification détaillée de la réponse
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erreur détaillée:', errorText);
                throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
            }
    
            const data = await response.json();
            console.log('Données extraites complètes:', data);
    
            // Vérification des données avant navigation
            if (!data || !data.data) {
                console.error('Structure de données invalide:', data);
                throw new Error('Données invalides reçues du backend');
            }
    
            // Log avant navigation
            console.log('Tentative de navigation avec:', {
                data: data,
                originalImage: preview
            });
    
            // Navigation avec les données
            navigate('/results', { 
                state: { 
                    data: data,
                    originalImage: preview
                } 
            });
    
            console.log('Navigation effectuée avec succès');
    
        } catch (error) {
            console.error('Erreur complète:', error);
            alert('Erreur lors du traitement: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
             style={{
                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.90)), url('https://i.pinimg.com/736x/7a/c6/cf/7ac6cf31bd5b48045274a50f66609c9b.jpg')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundAttachment: 'fixed'
             }}>
            <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-700
                          transform transition-all duration-500 hover:scale-[1.01]">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        ID Card Scanner
                    </h1>
                    <p className="text-gray-400">Secure Information Extraction</p>
                </div>

                <div className="mb-6 flex justify-center space-x-4">
    <button
        onClick={() => {
            stopCamera();
            setIsCamera(false);
            // Simuler un clic sur l'input file quand on clique sur Upload File
            document.getElementById('file-upload').click();
        }}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            !isCamera ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
        }`}
    >
        Upload File
    </button>
    <button
        onClick={startCamera}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            isCamera ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
        }`}
    >
        Use Camera
    </button>
        </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center
                                 hover:border-blue-500 transition-all duration-300
                                 bg-gray-800/50">
                        {isCamera ? (
                            <div className="space-y-4">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="max-h-48 mx-auto rounded-lg"
                                />
                                <canvas ref={canvasRef} className="hidden" />
                                <button
                                    type="button"
                                    onClick={captureImage}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                                >
                                    Capture Photo
                                </button>
                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                                >
                                    {preview ? (
                                        <div className="relative group">
                                            <img 
                                                src={preview} 
                                                alt="Preview" 
                                                className="max-h-48 mx-auto rounded-lg shadow-2xl 
                                                         transform transition-all duration-300 group-hover:brightness-75"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                                         transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                                <p className="text-white font-medium">Change Image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-12 px-4 space-y-4">
                                            <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-600 rounded-full 
                                                         flex items-center justify-center group-hover:border-blue-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" 
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                          d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <p className="text-lg font-medium text-gray-300">Upload your ID card</p>
                                            <p className="text-sm text-gray-400">or drag and drop here</p>
                                            <p className="text-xs text-gray-500">Supported formats: PNG, JPG</p>
                                        </div>
                                    )}
                                </label>
                            </>
                        )}
                    </div>
     
                    <button 
                        type="submit"
                        disabled={!file || loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl
                                 font-medium tracking-wide text-lg
                                 hover:from-blue-500 hover:to-purple-500 
                                 transform transition-all duration-300
                                 shadow-xl shadow-blue-900/20
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 border border-gray-700"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-3">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            'Extract Information'
                        )}
                    </button>
     
                    {loading && (
                        <div className="text-center text-sm text-gray-400 mt-2">
                            Please wait while we process your document...
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Home;