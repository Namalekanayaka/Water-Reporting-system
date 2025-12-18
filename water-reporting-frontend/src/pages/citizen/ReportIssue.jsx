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
                addNotification(`${response.message}`, 'success');
                reset();
                setSelectedLocation(null);
                setUploadedImages([]);
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            addNotification(error.message || 'Failed to submit report.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-[#fbfbfd] min-h-screen p-6 md:p-12">
            <div className="max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {/* Minimal Header */}
                <div className="text-center mb-16">
                    <span className="text-water-600 font-bold uppercase tracking-widest text-[13px] mb-3 block">Reporting Portal</span>
                    <h1 className="text-[40px] md:text-[56px] font-black tracking-tight text-gray-900 leading-none mb-6">
                        File a Report.
                    </h1>
                    <p className="text-[21px] text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">
                        Precision reporting helps our community stay hydrated and safe.
                    </p>
                </div>

                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-apple border border-gray-50/50">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                        {/* Section 1: Classification */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-[13px] font-black">1</div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Classification</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Issue Type</label>
                                    <select
                                        {...register('issueType', { required: 'Required' })}
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-bold text-gray-700 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select type</option>
                                        <option value="pipeline_leakage">Pipeline Leakage</option>
                                        <option value="low_pressure">Low Pressure</option>
                                        <option value="water_quality">Water Quality</option>
                                        <option value="no_supply">No Water Supply</option>
                                    </select>
                                    {errors.issueType && <p className="text-[12px] font-bold text-red-500 ml-1 mt-1">*{errors.issueType.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Urgency</label>
                                    <select
                                        {...register('priority', { required: 'Required' })}
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-bold text-gray-700 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select level</option>
                                        <option value="low">Standard</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High priority</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                    {errors.priority && <p className="text-[12px] font-bold text-red-500 ml-1 mt-1">*{errors.priority.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Precise Location */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-[13px] font-black">2</div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Location Details</h2>
                            </div>
                            <LocationPicker
                                onLocationSelect={handleLocationSelect}
                                initialLocation={selectedLocation}
                                className="apple-style"
                            />
                        </div>

                        {/* Section 3: Evidence & Details */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-[13px] font-black">3</div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Evidence</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Incident Report</label>
                                    <textarea
                                        {...register('description', { required: 'Required', minLength: 10 })}
                                        rows="4"
                                        placeholder="Specific details about the leak or quality..."
                                        className="w-full px-6 py-5 bg-gray-50 border border-transparent focus:border-gray-200 rounded-[24px] font-medium text-gray-700 outline-none transition-all resize-none leading-relaxed"
                                    ></textarea>
                                    {errors.description && <p className="text-[12px] font-bold text-red-500 ml-1">Minimum 10 characters required.</p>}
                                </div>

                                <ImageUpload
                                    onImagesChange={handleImagesChange}
                                    maxImages={5}
                                />
                            </div>
                        </div>

                        {/* Submission */}
                        <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-12 py-5 bg-water-600 hover:bg-[#0077ed] disabled:bg-gray-200 !text-white font-black text-[17px] rounded-full transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? 'Processing...' : 'Submit Report'}
                            </button>
                            <button
                                type="button"
                                onClick={() => { reset(); setSelectedLocation(null); setUploadedImages([]); }}
                                className="text-[15px] font-bold text-gray-400 hover:text-red-500 transition-colors"
                            >
                                Cancel & Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportIssue;
