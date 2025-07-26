// src/pages/SignUpPage.tsx

import "tailwindcss";
import apiService from '../services/apiService'; // Import your registerUser API
import { useNavigate } from 'react-router-dom';
import React, { useState, FormEvent } from 'react';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    userType: 'individual' | 'hr';
    // HR/Organization specific fields
    firstName: string;
    lastName: string;
    organizationName: string;
    jobTitle: string;
    phoneNumber: string;
    organizationSize: string;
    industry: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    userType?: string;
    firstName?: string;
    lastName?: string;
    organizationName?: string;
    jobTitle?: string;
    phoneNumber?: string;
    organizationSize?: string;
    industry?: string;
}

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'individual',
        firstName: '',
        lastName: '',
        organizationName: '',
        jobTitle: '',
        phoneNumber: '',
        organizationSize: '',
        industry: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const organizationSizes = [
        '1-10 employees',
        '11-50 employees',
        '51-200 employees',
        '201-500 employees',
        '501-1000 employees',
        '1000+ employees'
    ];

    const industries = [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'Manufacturing',
        'Retail',
        'Consulting',
        'Real Estate',
        'Government',
        'Non-profit',
        'Other'
    ];

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // User type validation
        if (!formData.userType) {
            newErrors.userType = 'Please select user type';
        }

        // HR/Organization specific validations
        if (formData.userType === 'hr') {
            if (!formData.firstName.trim()) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName.trim()) {
                newErrors.lastName = 'Last name is required';
            }
            if (!formData.organizationName.trim()) {
                newErrors.organizationName = 'Organization name is required';
            }
            if (!formData.jobTitle.trim()) {
                newErrors.jobTitle = 'Job title is required';
            }
            if (!formData.phoneNumber.trim()) {
                newErrors.phoneNumber = 'Phone number is required';
            } else if (!/^\+?[\d\-\s\(\)]+$/.test(formData.phoneNumber)) {
                newErrors.phoneNumber = 'Please enter a valid phone number';
            }
            if (!formData.organizationSize) {
                newErrors.organizationSize = 'Organization size is required';
            }
            if (!formData.industry) {
                newErrors.industry = 'Industry is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUserTypeChange = (userType: 'individual' | 'hr'): void => {
        setFormData({
            ...formData,
            userType,
            // Reset HR fields when switching to individual
            ...(userType === 'individual' && {
                firstName: '',
                lastName: '',
                organizationName: '',
                jobTitle: '',
                phoneNumber: '',
                organizationSize: '',
                industry: ''
            })
        });
        // Clear errors when switching user type
        setErrors({});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await apiService.registerUser(formData.email, formData.password, JSON.stringify(formData));
            console.log("response in signup page", response);
            alert(response.message);
            navigate('/dashboard');
        } catch (error) {
            console.log("Error", error);
            alert('An error occurred while registering');
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = (): void => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
                <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Sign Up</h2>
                        <p className="mt-2 text-sm text-gray-600">Create your HR Automation account</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* User Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                I am signing up as:
                            </label>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div
                                    className={`relative rounded-lg border p-4 cursor-pointer focus:outline-none ${
                                        formData.userType === 'individual'
                                            ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onClick={() => handleUserTypeChange('individual')}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="individual"
                                            checked={formData.userType === 'individual'}
                                            onChange={() => handleUserTypeChange('individual')}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">Individual User</div>
                                            <div className="text-sm text-gray-500">Job seeker or candidate</div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`relative rounded-lg border p-4 cursor-pointer focus:outline-none ${
                                        formData.userType === 'hr'
                                            ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onClick={() => handleUserTypeChange('hr')}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="hr"
                                            checked={formData.userType === 'hr'}
                                            onChange={() => handleUserTypeChange('hr')}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">HR/Organization</div>
                                            <div className="text-sm text-gray-500">Recruiter or hiring manager</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {errors.userType && (
                                <p className="mt-2 text-sm text-red-600">{errors.userType}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address *
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                        errors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* HR/Organization Additional Fields */}
                        {formData.userType === 'hr' && (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                            First Name *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter your first name"
                                            />
                                            {errors.firstName && (
                                                <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                            Last Name *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                                    errors.lastName ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter your last name"
                                            />
                                            {errors.lastName && (
                                                <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                                        Organization Name *
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="organizationName"
                                            name="organizationName"
                                            type="text"
                                            required
                                            value={formData.organizationName}
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                                errors.organizationName ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your organization name"
                                        />
                                        {errors.organizationName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.organizationName}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                                            Job Title *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="jobTitle"
                                                name="jobTitle"
                                                type="text"
                                                required
                                                value={formData.jobTitle}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                                    errors.jobTitle ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="e.g., HR Manager, Recruiter"
                                            />
                                            {errors.jobTitle && (
                                                <p className="mt-2 text-sm text-red-600">{errors.jobTitle}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                            Phone Number *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="tel"
                                                required
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                                    errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter your phone number"
                                            />
                                            {errors.phoneNumber && (
                                                <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="organizationSize" className="block text-sm font-medium text-gray-700">
                                            Organization Size *
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="organizationSize"
                                                name="organizationSize"
                                                required
                                                value={formData.organizationSize}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                                    errors.organizationSize ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="">Select organization size</option>
                                                {organizationSizes.map((size) => (
                                                    <option key={size} value={size}>
                                                        {size}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.organizationSize && (
                                                <p className="mt-2 text-sm text-red-600">{errors.organizationSize}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                                            Industry *
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="industry"
                                                name="industry"
                                                required
                                                value={formData.industry}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                                    errors.industry ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="">Select industry</option>
                                                {industries.map((industry) => (
                                                    <option key={industry} value={industry}>
                                                        {industry}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.industry && (
                                                <p className="mt-2 text-sm text-red-600">{errors.industry}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Password Fields */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password *
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                        errors.password ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showPassword ? (
                                        <span className="text-gray-500">Hide</span>
                                    ) : (
                                        <span className="text-gray-500">Show</span>
                                    )}
                                </button>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password *
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showConfirmPassword ? (
                                        <span className="text-gray-500">Hide</span>
                                    ) : (
                                        <span className="text-gray-500">Show</span>
                                    )}
                                </button>
                                {errors.confirmPassword && (
                                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Sign in here
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;