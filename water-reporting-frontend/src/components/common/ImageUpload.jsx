import React, { useState, useRef } from 'react';

const ImageUpload = ({
    onImagesChange,
    maxImages = 5,
    maxSizeMB = 5,
    className = ''
}) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    // Compress image using canvas
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions (max 1920x1080)
                    const maxWidth = 1920;
                    const maxHeight = 1080;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            resolve(compressedFile);
                        },
                        'image/jpeg',
                        0.8 // Quality 80%
                    );
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        setError('');

        // Check if adding these files would exceed max
        if (images.length + files.length > maxImages) {
            setError(`Maximum ${maxImages} images allowed`);
            return;
        }

        // Validate and compress each file
        const validFiles = [];
        for (const file of files) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                setError(`${file.name} is not an image file`);
                continue;
            }

            // Check file size
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > maxSizeMB) {
                setError(`${file.name} is larger than ${maxSizeMB}MB`);
                continue;
            }

            try {
                // Compress image
                const compressedFile = await compressImage(file);

                // Create preview URL
                const previewUrl = URL.createObjectURL(compressedFile);

                validFiles.push({
                    file: compressedFile,
                    preview: previewUrl,
                    name: file.name,
                    id: Date.now() + Math.random()
                });
            } catch (err) {
                console.error('Error compressing image:', err);
                setError(`Failed to process ${file.name}`);
            }
        }

        if (validFiles.length > 0) {
            const newImages = [...images, ...validFiles];
            setImages(newImages);
            onImagesChange(newImages.map(img => img.file));
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (id) => {
        const newImages = images.filter(img => img.id !== id);
        setImages(newImages);
        onImagesChange(newImages.map(img => img.file));
        setError('');
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Upload Images (Optional)
                    <span className="ml-2 text-xs font-normal text-slate-500">
                        Max {maxImages} images, up to {maxSizeMB}MB each
                    </span>
                </label>

                {/* Upload Button */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={images.length >= maxImages}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Choose Images
                    </button>
                    <span className="text-sm text-slate-500">
                        {images.length} / {maxImages} images
                    </span>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {error && (
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="relative group rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                            <img
                                src={image.preview}
                                alt={image.name}
                                className="w-full h-32 object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(image.id)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove image"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1.5 truncate">
                                {image.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
