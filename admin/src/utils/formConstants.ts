// constants/formConstants.ts
export const FORM_VALIDATION_RULES = {
    REQUIRED_FIELDS: ['candidateName', 'email', 'position'],
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\-\s\(\)]+$/,
    MIN_SUMMARY_LENGTH: 50,
    MAX_SUMMARY_LENGTH: 500,
    MIN_DESCRIPTION_LENGTH: 20,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_SKILLS_COUNT: 50,
    MAX_CERTIFICATIONS_COUNT: 20,
    MAX_LANGUAGES_COUNT: 10,
    MAX_WORK_HISTORY_COUNT: 20,
    MAX_EDUCATION_COUNT: 10
} as const;

export const TIME_RANGES = [
    { value: 'All Time', label: 'All Time' },
    { value: 'Last 7 days', label: 'Last 7 days' },
    { value: 'Last 30 days', label: 'Last 30 days' },
    { value: 'Last 90 days', label: 'Last 90 days' },
    { value: 'Last 6 months', label: 'Last 6 months' },
    { value: 'Last year', label: 'Last year' }
] as const;

export const EXPERIENCE_RANGES = [
    { value: 'All Experience', label: 'All Experience' },
    { value: '0-2 years', label: '0-2 years' },
    { value: '3-5 years', label: '3-5 years' },
    { value: '6-10 years', label: '6-10 years' },
    { value: '10+ years', label: '10+ years' }
] as const;

export const SORT_OPTIONS = [
    { value: 'Latest Upload', label: 'Latest Upload' },
    { value: 'Name A-Z', label: 'Name A-Z' },
    { value: 'Name Z-A', label: 'Name Z-A' },
    { value: 'Match Score', label: 'Match Score' },
    { value: 'Experience', label: 'Experience' },
    { value: 'Location', label: 'Location' },
    { value: 'Status', label: 'Status' }
] as const;

export const STATUS_OPTIONS = [
    { value: 'All Status', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'parsed', label: 'Parsed' },
    { value: 'indexed', label: 'Indexed' },
    { value: 'matched', label: 'Matched' }
] as const;

export const SOURCE_OPTIONS = [
    { value: 'All Sources', label: 'All Sources' },
    { value: 'local', label: 'Local Upload' },
    { value: 'gdrive', label: 'Google Drive' },
    { value: 'onedrive', label: 'OneDrive' }
] as const;

// constants/uiConstants.ts
export const THEME_COLORS = {
    primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
    },
    success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a'
    },
    warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        600: '#d97706'
    },
    error: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626'
    }
} as const;

export const ANIMATION_DURATIONS = {
    fast: 150,
    normal: 300,
    slow: 500
} as const;

export const BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
} as const;

export const Z_INDICES = {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
} as const;