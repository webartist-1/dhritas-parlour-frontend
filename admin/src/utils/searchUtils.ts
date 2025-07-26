// utils/searchUtils.ts
import { ResumeDetail } from '../types/resumeTypes';

export interface SearchFilters {
  status?: string;
  source?: string;
  timeRange?: string;
  experience?: string;
  skills?: string[];
  location?: string;
}

export const filterResumes = (resumes: ResumeDetail[], filters: SearchFilters): ResumeDetail[] => {
  return resumes.filter(resume => {
    // Status filter
    if (filters.status && filters.status !== 'All Status' && resume.status !== filters.status.toLowerCase()) {
      return false;
    }

    // Source filter
    if (filters.source && filters.source !== 'All Sources' && resume.source !== filters.source.toLowerCase()) {
      return false;
    }

    // Time range filter
    if (filters.timeRange && filters.timeRange !== 'All Time') {
      const now = new Date();
      const uploadDate = new Date(resume.uploadDate);
      const daysDiff = Math.ceil((now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (filters.timeRange) {
        case 'Last 7 days':
          if (daysDiff > 7) return false;
          break;
        case 'Last 30 days':
          if (daysDiff > 30) return false;
          break;
        case 'Last 90 days':
          if (daysDiff > 90) return false;
          break;
      }
    }

    // Experience filter
    if (filters.experience && filters.experience !== 'All Experience') {
      const years = parseInt(resume.experience);
      switch (filters.experience) {
        case '0-2 years':
          if (years > 2) return false;
          break;
        case '3-5 years':
          if (years < 3 || years > 5) return false;
          break;
        case '6-10 years':
          if (years < 6 || years > 10) return false;
          break;
        case '10+ years':
          if (years < 10) return false;
          break;
      }
    }

    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      const hasRequiredSkills = filters.skills.some(skill => 
        resume.skills.some(resumeSkill => 
          resumeSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasRequiredSkills) return false;
    }

    // Location filter
    if (filters.location && filters.location !== 'All Locations') {
      if (!resume.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
};

export const searchResumes = (resumes: ResumeDetail[], searchTerm: string): ResumeDetail[] => {
  if (!searchTerm.trim()) return resumes;

  const term = searchTerm.toLowerCase();
  return resumes.filter(resume =>
    resume.candidateName.toLowerCase().includes(term) ||
    resume.email.toLowerCase().includes(term) ||
    resume.position.toLowerCase().includes(term) ||
    resume.location.toLowerCase().includes(term) ||
    resume.summary.toLowerCase().includes(term) ||
    resume.skills.some(skill => skill.toLowerCase().includes(term)) ||
    resume.workHistory.some(work => 
      work.company.toLowerCase().includes(term) ||
      work.position.toLowerCase().includes(term) ||
      work.description.toLowerCase().includes(term)
    ) ||
    resume.educationHistory.some(edu =>
      edu.institution.toLowerCase().includes(term) ||
      edu.degree.toLowerCase().includes(term)
    )
  );
};

export const sortResumes = (resumes: ResumeDetail[], sortBy: string): ResumeDetail[] => {
  const sorted = [...resumes];
  
  switch (sortBy) {
    case 'Latest Upload':
      return sorted.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    case 'Name A-Z':
      return sorted.sort((a, b) => a.candidateName.localeCompare(b.candidateName));
    case 'Name Z-A':
      return sorted.sort((a, b) => b.candidateName.localeCompare(a.candidateName));
    case 'Match Score':
      return sorted.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    case 'Experience':
      return sorted.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    case 'Location':
      return sorted.sort((a, b) => a.location.localeCompare(b.location));
    case 'Status':
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    default:
      return sorted;
  }
};
