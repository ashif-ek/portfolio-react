import { useState } from 'react';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import Api from '../Api'; // Assuming Api.js is in src/components/

const ImageUploader = ({ onUploadSuccess, initialImage }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(initialImage || null);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validations
        if (!file.type.startsWith('image/')) {
            setError("Please upload an image file.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError("File size must be less than 5MB.");
            return;
        }

        setError(null);
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await Api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            const imageUrl = res.data.filename; /* Our backend returns filename, and we usually store just filename in DB */
            setPreview(URL.createObjectURL(file)); // Show local preview instantly
            if (onUploadSuccess) onUploadSuccess(imageUrl);
        } catch (err) {
            console.error("Upload failed", err);
            setError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            
            <div className="flex items-center space-x-4">
                {/* Preview Area */}
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                    {preview ? (
                        <img 
                            src={preview.startsWith('blob:') ? preview : `/uploads/${preview}`} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100?text=No+Img"; }}
                        />
                    ) : (
                        <ImageIcon className="text-gray-400" />
                    )}
                </div>

                {/* Upload Button */}
                <div className="flex-1">
                    <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="image-upload"
                        className={`flex items-center justify-center w-full px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                            ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-cyan-500 hover:bg-cyan-50'}
                        `}
                    >
                        {uploading ? (
                            <div className="flex items-center text-gray-500">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                                Uploading...
                            </div>
                        ) : (
                            <div className="flex items-center text-gray-600">
                                <Upload size={18} className="mr-2" />
                                <span className="text-sm font-medium">Click to upload image</span>
                            </div>
                        )}
                    </label>
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                    <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
