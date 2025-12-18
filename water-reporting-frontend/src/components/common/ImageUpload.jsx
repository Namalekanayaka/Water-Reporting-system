import React, { useState, useRef } from 'react';

const ImageUpload = ({ onImagesChange, maxImages = 5, maxSizeMB = 5, className = '' }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let { width, height } = img;
                    const max = 1920;
                    if (width > height && width > max) { height *= max / width; width = max; }
                    else if (height > max) { width *= max / height; height = max; }
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() })), 'image/jpeg', 0.8);
                };
                img.onerror = reject; img.src = e.target.result;
            };
            reader.onerror = reject; reader.readAsDataURL(file);
        });
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        setError('');
        if (images.length + files.length > maxImages) { setError(`Max ${maxImages} images.`); return; }
        const validFiles = [];
        for (const file of files) {
            if (!file.type.startsWith('image/')) { setError(`${file.name} is not an image.`); continue; }
            if (file.size / (1024 * 1024) > maxSizeMB) { setError(`${file.name} is too large.`); continue; }
            try {
                const compressed = await compressImage(file);
                validFiles.push({ file: compressed, preview: URL.createObjectURL(compressed), name: file.name, id: Date.now() + Math.random() });
            } catch (err) { setError(`Failed to process ${file.name}`); }
        }
        if (validFiles.length > 0) {
            const next = [...images, ...validFiles];
            setImages(next); onImagesChange(next.map(img => img.file));
        }
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeImage = (id) => {
        const next = images.filter(img => img.id !== id);
        setImages(next); onImagesChange(next.map(img => img.file));
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="space-y-3">
                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Visual Evidence</label>
                <div className="flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={images.length >= maxImages}
                        className="px-8 py-4 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-600 rounded-[20px] font-black text-[14px] transition-all flex items-center gap-3 border border-transparent active:scale-95 shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Upload Photos
                    </button>
                    <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                        {images.length} of {maxImages}
                    </span>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
                {error && <p className="text-[12px] font-bold text-red-500 ml-1">{error}</p>}
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <div key={img.id} className="relative group rounded-[24px] overflow-hidden bg-gray-50 shadow-apple border border-gray-100">
                            <img src={img.preview} alt={img.name} className="w-full h-32 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            <button
                                type="button"
                                onClick={() => removeImage(img.id)}
                                className="absolute top-2 right-2 p-1.5 bg-gray-900/40 hover:bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
