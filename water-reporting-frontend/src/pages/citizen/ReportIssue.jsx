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
        <div className="w-full bg-md-surface min-h-screen">
            <div className="max-w-[840px] mx-auto py-12 md:py-24 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {/* M3 Centered Header */}
                <div className="text-center mb-16">
                    <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">Reporting Portal</span>
                    <h1 className="text-[40px] md:text-[64px] font-black tracking-tight text-md-on-surface leading-none mb-6">
                        File a Report.
                    </h1>
                    <p className="text-[19px] text-md-on-surface-variant font-medium max-w-lg mx-auto leading-relaxed">
                        Precision reporting helps us protect our shared community infrastructure.
                    </p>
                </div>

                <div className="bg-white rounded-[32px] p-8 md:p-14 shadow-md-2 border border-md-outline/5 relative overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
                        {/* Section 1: Classification */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-md-primary-container text-md-on-primary-container flex items-center justify-center text-[15px] font-black shadow-sm">1</div>
                                <h2 className="text-[22px] font-black text-md-on-surface tracking-tight">Classification</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[13px] font-black text-md-on-surface-variant uppercase tracking-widest ml-1">Issue Type</label>
                                    <div className="relative">
                                        <select
                                            {...register('issueType', { required: 'Required' })}
                                            className="w-full h-14 px-6 bg-md-surface-variant/40 border-b-2 border-md-outline/20 focus:border-md-primary rounded-t-xl font-bold text-md-on-surface outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select type</option>
                                            <option value="pipeline_leakage">Pipeline Leakage</option>
                                            <option value="low_pressure">Low Pressure</option>
                                            <option value="water_quality">Water Quality</option>
                                            <option value="no_supply">No Water Supply</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-md-on-surface-variant">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                    {errors.issueType && <p className="text-[11px] font-black text-md-error ml-1">*{errors.issueType.message}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[13px] font-black text-md-on-surface-variant uppercase tracking-widest ml-1">Urgency</label>
                                    <div className="relative">
                                        <select
                                            {...register('priority', { required: 'Required' })}
                                            className="w-full h-14 px-6 bg-md-surface-variant/40 border-b-2 border-md-outline/20 focus:border-md-primary rounded-t-xl font-bold text-md-on-surface outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select level</option>
                                            <option value="low">Standard</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High priority</option>
                                            <option value="critical">Critical</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-md-on-surface-variant">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                    {errors.priority && <p className="text-[11px] font-black text-md-error ml-1">*{errors.priority.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Precise Location */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-md-primary-container text-md-on-primary-container flex items-center justify-center text-[15px] font-black shadow-sm">2</div>
                                <h2 className="text-[22px] font-black text-md-on-surface tracking-tight">Location Details</h2>
                            </div>
                            <div className="rounded-[24px] overflow-hidden border border-md-outline/10 shadow-sm">
                                <LocationPicker
                                    onLocationSelect={handleLocationSelect}
                                    initialLocation={selectedLocation}
                                    className="m3-style"
                                />
                            </div>
                        </div>

                        {/* Section 3: Evidence & Details */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-md-primary-container text-md-on-primary-container flex items-center justify-center text-[15px] font-black shadow-sm">3</div>
                                <h2 className="text-[22px] font-black text-md-on-surface tracking-tight">Documentation</h2>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-3">
                                    <label className="text-[13px] font-black text-md-on-surface-variant uppercase tracking-widest ml-1">Incident Description</label>
                                    <textarea
                                        {...register('description', { required: 'Required', minLength: 10 })}
                                        rows="4"
                                        placeholder="Explain the specific structural failure or quality issue..."
                                        className="w-full px-6 py-5 bg-md-surface-variant/40 border-b-2 border-md-outline/20 focus:border-md-primary rounded-t-[24px] font-medium text-md-on-surface outline-none transition-all resize-none leading-relaxed"
                                    ></textarea>
                                    {errors.description && <p className="text-[11px] font-black text-md-error ml-1">Minimum 10 characters required for system indexing.</p>}
                                </div>

                                <div className="bg-md-surface-variant/20 p-8 rounded-[28px] border border-dashed border-md-outline/20">
                                    <ImageUpload
                                        onImagesChange={handleImagesChange}
                                        maxImages={5}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submission Row */}
                        <div className="pt-12 flex flex-col sm:flex-row items-center gap-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto h-16 px-14 bg-md-primary text-white hover:shadow-lg disabled:bg-md-outline/20 font-black text-[17px] rounded-full transition-all active:scale-95 flex items-center justify-center gap-3 shadow-md"
                            >
                                {isSubmitting ? 'Submitting Data...' : 'Submit Infrastructure Report'}
                            </button>
                            <button
                                type="button"
                                onClick={() => { reset(); setSelectedLocation(null); setUploadedImages([]); }}
                                className="h-16 px-10 text-[14px] font-black text-md-on-surface-variant/60 hover:text-md-error transition-colors uppercase tracking-widest"
                            >
                                Reset Form
                            </button>
                        </div>
                    </form>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-md-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                </div>
            </div>
        </div>
    );
};

export default ReportIssue;
