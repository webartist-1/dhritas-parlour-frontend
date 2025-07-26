// constants/apiEndpoints.ts
export const API_ENDPOINTS = {
    // Resume endpoints
    RESUMES: '/api/resumes',
    RESUME_BY_ID: (id: string) => `/api/resumes/${id}`,
    UPLOAD_RESUME: '/api/resumes/upload',
    INDEX_RESUME: (id: string) => `/api/resumes/${id}/index`,
    FORMAT_RESUME: (id: string) => `/api/resumes/${id}/format`,

    // Search endpoints
    SEARCH_RESUMES: '/api/resumes/search',
    FILTER_RESUMES: '/api/resumes/filter',

    // Job matching endpoints
    JOB_MATCHES: (resumeId: string) => `/api/resumes/${resumeId}/matches`,
    GENERATE_MATCHES: (resumeId: string) => `/api/resumes/${resumeId}/generate-matches`,

    // Analytics endpoints
    ANALYTICS: '/api/analytics',
    RESUME_ANALYTICS: '/api/analytics/resumes',

    // User endpoints
    USER_PROFILE: '/api/user/profile',
    USER_PREFERENCES: '/api/user/preferences',

    // Notes endpoints
    RESUME_NOTES: (resumeId: string) => `/api/resumes/${resumeId}/notes`,
    ADD_NOTE: (resumeId: string) => `/api/resumes/${resumeId}/notes`,

    // Integration endpoints
    GOOGLE_DRIVE_IMPORT: '/api/integrations/gdrive/import',
    ONEDRIVE_IMPORT: '/api/integrations/onedrive/import',

    // Export endpoints
    EXPORT_RESUMES: '/api/resumes/export',
    BULK_OPERATIONS: '/api/resumes/bulk'
} as const;
