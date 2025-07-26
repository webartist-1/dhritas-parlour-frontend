// constants/localStorageKeys.ts
export const STORAGE_KEYS = {
    USER_PREFERENCES: 'hr_automation_user_preferences',
    SEARCH_FILTERS: 'hr_automation_search_filters',
    PAGINATION_SETTINGS: 'hr_automation_pagination',
    THEME_SETTINGS: 'hr_automation_theme',
    RECENT_SEARCHES: 'hr_automation_recent_searches',
    DASHBOARD_LAYOUT: 'hr_automation_dashboard_layout',
    NOTIFICATION_SETTINGS: 'hr_automation_notifications'
} as const;

export const SESSION_KEYS = {
    CURRENT_TAB: 'hr_automation_current_tab',
    FORM_DATA: 'hr_automation_form_data',
    UPLOAD_PROGRESS: 'hr_automation_upload_progress'
} as const;