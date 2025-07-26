// services/dashboardDataService.ts
import { Resume, JobPosting, DashboardStats } from '../components/dashboard/types';

// Mock data service - replace with actual API calls in production
export class DashboardDataService {
  // Dashboard Statistics
  static getDashboardStats(): DashboardStats {
    return {
      totalResumes: 247,
      parsedResumes: 235,
      indexedResumes: 221,
      matchedCandidates: 89,
      activeJobs: 12,
      pendingReviews: 34,
      recentUploads: 18,
      averageMatchScore: 78.5
    };
  }

  // Recent Resumes
  static getRecentResumes(): Resume[] {
    return [
      {
        id: '1',
        candidateName: 'Sarah Johnson',
        fileName: 'Sarah_Johnson_Resume.pdf',
        uploadDate: '2025-06-19T10:30:00Z',
        status: 'indexed',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        experience: '5 years',
        position: 'Frontend Developer',
        matchScore: 92,
        source: 'local'
      },
      {
        id: '2',
        candidateName: 'Michael Chen',
        fileName: 'Michael_Chen_CV.docx',
        uploadDate: '2025-06-19T09:15:00Z',
        status: 'matched',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Docker'],
        experience: '7 years',
        position: 'Data Scientist',
        matchScore: 87,
        source: 'gdrive'
      },
      {
        id: '3',
        candidateName: 'Emma Rodriguez',
        fileName: 'Emma_Rodriguez_Resume.pdf',
        uploadDate: '2025-06-19T08:45:00Z',
        status: 'parsed',
        skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
        experience: '4 years',
        position: 'UX Designer',
        matchScore: 85,
        source: 'onedrive'
      },
      {
        id: '4',
        candidateName: 'David Kim',
        fileName: 'David_Kim_Resume.pdf',
        uploadDate: '2025-06-18T16:20:00Z',
        status: 'indexed',
        skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes'],
        experience: '6 years',
        position: 'Backend Developer',
        matchScore: 89,
        source: 'local'
      },
      {
        id: '5',
        candidateName: 'Lisa Anderson',
        fileName: 'Lisa_Anderson_CV.docx',
        uploadDate: '2025-06-18T14:10:00Z',
        status: 'pending',
        skills: ['Project Management', 'Scrum', 'Agile'],
        experience: '8 years',
        position: 'Project Manager',
        source: 'gdrive'
      },
      {
        id: '6',
        candidateName: 'Alex Thompson',
        fileName: 'Alex_Thompson_Resume.pdf',
        uploadDate: '2025-06-18T11:45:00Z',
        status: 'indexed',
        skills: ['DevOps', 'AWS', 'Docker', 'Jenkins'],
        experience: '6 years',
        position: 'DevOps Engineer',
        matchScore: 91,
        source: 'onedrive'
      },
      {
        id: '7',
        candidateName: 'Jessica Wong',
        fileName: 'Jessica_Wong_CV.docx',
        uploadDate: '2025-06-17T15:20:00Z',
        status: 'matched',
        skills: ['Product Management', 'Analytics', 'User Research'],
        experience: '5 years',
        position: 'Product Manager',
        matchScore: 88,
        source: 'local'
      }
    ];
  }

  // Active Jobs
  static getActiveJobs(): JobPosting[] {
    return [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        postedDate: '2025-06-15',
        applicants: 45,
        status: 'active',
        matchedCandidates: 12
      },
      {
        id: '2',
        title: 'Data Scientist',
        department: 'Analytics',
        postedDate: '2025-06-12',
        applicants: 38,
        status: 'active',
        matchedCandidates: 8
      },
      {
        id: '3',
        title: 'UX Designer',
        department: 'Design',
        postedDate: '2025-06-10',
        applicants: 29,
        status: 'active',
        matchedCandidates: 15
      },
      {
        id: '4',
        title: 'Backend Developer',
        department: 'Engineering',
        postedDate: '2025-06-08',
        applicants: 32,
        status: 'paused',
        matchedCandidates: 9
      },
      {
        id: '5',
        title: 'Product Manager',
        department: 'Product',
        postedDate: '2025-06-05',
        applicants: 56,
        status: 'active',
        matchedCandidates: 18
      },
      {
        id: '6',
        title: 'DevOps Engineer',
        department: 'Engineering',
        postedDate: '2025-06-03',
        applicants: 24,
        status: 'active',
        matchedCandidates: 7
      }
    ];
  }

  // Filter methods
  static getResumesByStatus(status: Resume['status']): Resume[] {
    return this.getRecentResumes().filter(resume => resume.status === status);
  }

  static getResumesBySource(source: Resume['source']): Resume[] {
    return this.getRecentResumes().filter(resume => resume.source === source);
  }

  static getJobsByDepartment(department: string): JobPosting[] {
    return this.getActiveJobs().filter(job => job.department === department);
  }

  static getJobsByStatus(status: JobPosting['status']): JobPosting[] {
    return this.getActiveJobs().filter(job => job.status === status);
  }

  // Search methods
  static searchResumes(query: string): Resume[] {
    const term = query.toLowerCase();
    return this.getRecentResumes().filter(resume =>
      resume.candidateName.toLowerCase().includes(term) ||
      resume.position.toLowerCase().includes(term) ||
      resume.skills.some(skill => skill.toLowerCase().includes(term)) ||
      resume.fileName.toLowerCase().includes(term)
    );
  }

  static searchJobs(query: string): JobPosting[] {
    const term = query.toLowerCase();
    return this.getActiveJobs().filter(job =>
      job.title.toLowerCase().includes(term) ||
      job.department.toLowerCase().includes(term)
    );
  }

  // Analytics methods
  static getResumeStatsByTimeRange(range: '7d' | '30d' | '90d'): DashboardStats {
    // In a real implementation, this would filter data by date range
    // For now, return mock data that varies by range
    const baseStats = this.getDashboardStats();
    
    const multipliers = {
      '7d': 0.2,
      '30d': 1.0,
      '90d': 2.5
    };

    const multiplier = multipliers[range];
    
    return {
      ...baseStats,
      totalResumes: Math.round(baseStats.totalResumes * multiplier),
      parsedResumes: Math.round(baseStats.parsedResumes * multiplier),
      indexedResumes: Math.round(baseStats.indexedResumes * multiplier),
      matchedCandidates: Math.round(baseStats.matchedCandidates * multiplier),
      recentUploads: Math.round(baseStats.recentUploads * (range === '7d' ? 1 : range === '30d' ? 4 : 12))
    };
  }

  // Department-wise stats
  static getDepartmentStats(): Array<{department: string, activeJobs: number, totalApplicants: number}> {
    const jobs = this.getActiveJobs();
    const departments = [...new Set(jobs.map(job => job.department))];
    
    return departments.map(dept => ({
      department: dept,
      activeJobs: jobs.filter(job => job.department === dept && job.status === 'active').length,
      totalApplicants: jobs
        .filter(job => job.department === dept)
        .reduce((sum, job) => sum + job.applicants, 0)
    }));
  }

  // Skills analysis
  static getTopSkills(): Array<{skill: string, count: number}> {
    const resumes = this.getRecentResumes();
    const skillCount: {[key: string]: number} = {};
    
    resumes.forEach(resume => {
      resume.skills.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });
    
    return Object.entries(skillCount)
      .map(([skill, count]) => ({skill, count}))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  // Recent activity
  static getRecentActivity(): Array<{
    id: string;
    type: 'resume' | 'job' | 'match';
    description: string;
    timestamp: string;
  }> {
    return [
      {
        id: '1',
        type: 'resume',
        description: 'New resume uploaded: Sarah Johnson - Frontend Developer',
        timestamp: '2025-06-19T10:30:00Z'
      },
      {
        id: '2',
        type: 'match',
        description: 'Michael Chen matched with Data Scientist position (87% match)',
        timestamp: '2025-06-19T09:15:00Z'
      },
      {
        id: '3',
        type: 'resume',
        description: 'Resume parsed: Emma Rodriguez - UX Designer',
        timestamp: '2025-06-19T08:45:00Z'
      },
      {
        id: '4',
        type: 'job',
        description: 'New job posted: Senior Frontend Developer',
        timestamp: '2025-06-15T14:20:00Z'
      }
    ];
  }
}

export default DashboardDataService;