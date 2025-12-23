import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LocationPicker from '../../components/maps/LocationPicker';
import ImageUpload from '../../components/common/ImageUpload';
import { useNotification } from '../../context/NotificationContext';
import { createReport } from '../../services/api/reports';
import { analyzeReportSeverity } from '../../services/api/predictions';

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
        setValue,
        getValues
    } = useForm();

    // AI Integration
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Improved AI Analysis Handler
    const handleAIAnalysis = async () => {
        const description = getValues('description');
        if (!description || description.length < 5) {
            addNotification('Please enter a description first.', 'info');
            return;
        }

        setIsAnalyzing(true);
        try {
            console.log("Requesting AI analysis for:", description);
            const result = await analyzeReportSeverity(description);
            console.log("AI Response:", result);

            if (result && result.severity) {
                const urgencyMap = {
                    'low': 'low',
                    'medium': 'medium',
                    'high': 'high',
                    'critical': 'critical'
                };

                // Safer string handling
                const severityKey = String(result.severity).toLowerCase();
                const matchedPriority = urgencyMap[severityKey] || 'medium';

                setValue('priority', matchedPriority, { shouldValidate: true });
                addNotification(`AI Assessment: ${result.explanation}`, 'success');
            } else {
                console.warn("AI returned invalid result format:", result);
                addNotification('AI could not determine severity. Please select manually.', 'warning');
            }
        } catch (error) {
            console.error("AI Analysis Integration Error:", error);
            addNotification('AI Analysis failed. Please confirm details manually.', 'error');
        } finally {
            setIsAnalyzing(false);
        }
    };


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
                // Debug log
                _debug_priority_sent: console.log("Submitting Priority:", data.priority) || data.priority,
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
        <div className="w-full bg-md-surface min-h-screen lg:h-screen flex flex-col lg:overflow-hidden">
            {/* Header - Compact */}
            <div className="shrink-0 pt-6 pb-2 px-8 flex justify-between items-end">
                <div>
                    <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[10px] block">Reporting Portal</span>
                    <h1 className="text-3xl font-black tracking-tight text-md-on-surface leading-none">
                        File a Report.
                    </h1>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[13px] text-md-on-surface-variant font-medium">
                        Fill details & pin location to submit.
                    </p>
                </div>
            </div>

            {/* Main Content - Full Height Grid */}
            <div className="flex-1 p-4 md:p-6 lg:min-h-0">
                <form onSubmit={handleSubmit(onSubmit)} className="lg:h-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Form Controls (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-4 lg:h-full lg:overflow-y-auto pr-0 lg:pr-2 custom-scrollbar">
                        {/* Classification Card */}
                        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-md-outline/10">
                            <h2 className="text-sm font-black text-md-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-md-primary-container text-md-on-primary-container flex items-center justify-center text-xs">1</span>
                                Details
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-wider">Type</label>
                                    <select
                                        {...register('issueType', { required: 'Required' })}
                                        className="w-full h-10 px-3 bg-md-surface-variant/30 border-b border-md-outline/20 focus:border-md-primary rounded-t-lg text-sm font-bold text-md-on-surface outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="pipeline_leakage">Leakage</option>
                                        <option value="low_pressure">Low Pressure</option>
                                        <option value="water_quality">Water Quality</option>
                                        <option value="no_supply">No Supply</option>
                                    </select>
                                    {errors.issueType && <p className="text-[10px] text-red-500 font-bold">{errors.issueType.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-wider">Urgency</label>
                                    <select
                                        {...register('priority', { required: 'Required' })}
                                        className="w-full h-10 px-3 bg-md-surface-variant/30 border-b border-md-outline/20 focus:border-md-primary rounded-t-lg text-sm font-bold text-md-on-surface outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">Priority</option>
                                        <option value="low">Standard</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                    {errors.priority && <p className="text-[10px] text-red-500 font-bold">{errors.priority.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-md-outline/10 flex-1 flex flex-col">
                            <h2 className="text-sm font-black text-md-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-md-primary-container text-md-on-primary-container flex items-center justify-center text-xs">2</span>
                                Evidence
                            </h2>

                            <div className="mb-4 flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-wider">Description</label>
                                    <button
                                        type="button"
                                        onClick={handleAIAnalysis}
                                        disabled={isAnalyzing}
                                        className="text-[10px] font-black text-md-primary bg-md-primary-container/30 px-2 py-1 rounded-lg hover:bg-md-primary-container/50 transition-colors flex items-center gap-1 disabled:opacity-50"
                                    >
                                        {isAnalyzing ? 'Analyzing...' : '✨ AI Assess'}
                                    </button>
                                </div>
                                <textarea
                                    {...register('description', { required: 'Required', minLength: 10 })}
                                    className="w-full h-full min-h-[100px] p-4 bg-md-surface-variant/30 border-b border-md-outline/20 focus:border-md-primary rounded-t-xl text-sm font-medium text-md-on-surface outline-none resize-none leading-relaxed"
                                    placeholder="Describe the structural failure..."
                                ></textarea>
                                {errors.description && <p className="text-[10px] text-red-500 font-bold mt-1">Min 10 chars required.</p>}
                            </div>

                            <div>
                                <ImageUpload
                                    onImagesChange={handleImagesChange}
                                    maxImages={3}
                                    compact={true}
                                />
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="bg-white rounded-[24px] p-4 shadow-sm border border-md-outline/10 grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => { reset(); setSelectedLocation(null); setUploadedImages([]); }}
                                className="col-span-1 h-12 rounded-xl text-xs font-black text-md-on-surface-variant/70 hover:bg-red-50 hover:text-red-600 transition-colors uppercase tracking-wider"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="col-span-2 h-12 bg-md-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:bg-md-primary/90 transition-all active:scale-95 disabled:bg-gray-300"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Report'}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Map (8 cols) - Mobile Visible now */}
                    <div className="col-span-1 lg:col-span-8 h-[400px] lg:h-full bg-white rounded-[32px] overflow-hidden border border-md-outline/10 shadow-md relative group">
                        <div className="absolute top-6 left-6 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-md-outline/10 shadow-sm pointer-events-none">
                            <h2 className="text-xs font-black text-md-on-surface uppercase tracking-wide flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-md-primary-container text-md-on-primary-container flex items-center justify-center text-[10px]">3</span>
                                Pin Location
                            </h2>
                        </div>
                        <LocationPicker
                            onLocationSelect={handleLocationSelect}
                            initialLocation={selectedLocation}
                            className="h-full w-full"
                        />
                        {/* Overlay Hint if no location selected */}
                        {!selectedLocation && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none z-[400]">
                                <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg border border-white/50">
                                    <p className="text-sm font-bold text-md-on-surface flex items-center gap-2">
                                        <span className="text-xl">📍</span> Click on map to set location
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportIssue;
