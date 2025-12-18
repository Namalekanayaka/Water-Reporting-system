import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LocationPicker from '../../components/maps/LocationPicker';
import ImageUpload from '../../components/common/ImageUpload';
import { useNotification } from '../../context/NotificationContext';
import { createReport } from '../../services/api/reports';

const ReportIssue = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addNotification } = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setValue('location', location, { shouldValidate: true });
    };

    const handleImagesChange = (images) => {
        setUploadedImages(images);
        setValue('images', images);
    };

    const onSubmit = async (data) => {
        // Validate location
        if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
            addNotification('Please select a location on the map', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const reportData = {
                type: data.issueType,
                priority: data.priority,
                location: {
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                    address: selectedLocation.address
                },
                description: data.description,
                images: uploadedImages,
                imageCount: uploadedImages.length
            };

            const response = await createReport(reportData);

            if (response.success) {
                addNotification(
                    `${response.message} Report ID: ${response.reportId}`,
                    'success'
                );

                // Reset form
                reset();
                setSelectedLocation(null);
                setUploadedImages([]);
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            addNotification(
                error.message || 'Failed to submit report. Please try again.',
                'error'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Report Water Issue
                    </h1>
                    <p className="text-gray-500">
                        Submit a new water-related issue for your area. Include location, photos, and details.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Issue Type and Priority */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Issue Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('issueType', { required: 'Issue type is required' })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all"
                            >
                                <option value="">Select issue type</option>
                                <option value="pipeline_leakage">Pipeline Leakage</option>
                                <option value="low_pressure">Low Pressure</option>
                                <option value="water_quality">Water Quality</option>
                                <option value="no_supply">No Water Supply</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.issueType && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.issueType.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Priority Level <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('priority', { required: 'Priority level is required' })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all"
                            >
                                <option value="">Select priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                            {errors.priority && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.priority.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Location Picker */}
                    <LocationPicker
                        onLocationSelect={handleLocationSelect}
                        initialLocation={selectedLocation}
                    />
                    {errors.location && (
                        <p className="text-sm text-red-600">
                            Please select a location on the map
                        </p>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 10,
                                    message: 'Description must be at least 10 characters'
                                },
                                maxLength: {
                                    value: 500,
                                    message: 'Description must not exceed 500 characters'
                                }
                            })}
                            rows="4"
                            placeholder="Describe the issue in detail..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all resize-none"
                        ></textarea>
                        {errors.description && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <ImageUpload
                        onImagesChange={handleImagesChange}
                        maxImages={5}
                        maxSizeMB={5}
                    />

                    {/* Submit Button */}
                    <div className="pt-4 flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-water-600 hover:bg-water-700 disabled:bg-gray-400 disabled:cursor-not-allowed !text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                'Submit Report'
                            )}
                        </button>

                        {!isSubmitting && (
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    setSelectedLocation(null);
                                    setUploadedImages([]);
                                }}
                                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                            >
                                Clear Form
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportIssue;
