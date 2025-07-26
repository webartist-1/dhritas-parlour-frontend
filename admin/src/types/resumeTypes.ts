// types/resumeTypes.ts

export interface ResumeDetail {
    id: string;
    candidateName: string;
    fileName: string;
    uploadDate: string;
    lastModified: string;
    status: 'parsed' | 'indexed' | 'matched' | 'pending';
    skills: string[];
    experience: string;
    position: string;
    matchScore?: number;
    source: 'local' | 'gdrive' | 'onedrive';
    email: string;
    phone: string;
    location: string;
    education: string;
    summary: string;
    fileSize: string;
    rating?: number;
    workHistory: WorkExperience[];
    educationHistory: Education[];
    certifications: string[];
    languages: Language[];
    matchedJobs: JobMatch[];
    notes: Note[];
}

export interface WorkExperience {
    company: string;
    position: string;
    duration: string;
    description: string;
}

export interface Education {
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
}

export interface Language {
    language: string;
    proficiency: string;
}

export interface JobMatch {
    jobId: string;
    title: string;
    department: string;
    matchScore: number;
    matchReasons: string[];
}

export interface Note {
    id: string;
    author: string;
    content: string;
    date: string;
}