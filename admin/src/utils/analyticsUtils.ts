// utils/analyticsUtils.ts
import { ResumeDetail } from '../types/resumeTypes';

export interface ResumeAnalytics {
    totalResumes: number;
    statusBreakdown: Record<string, number>;
    sourceBreakdown: Record<string, number>;
    averageMatchScore: number;
    topSkills: Array<{ skill: string; count: number }>;
    experienceDistribution: Record<string, number>;
    locationDistribution: Record<string, number>;
    uploadTrends: Array<{ date: string; count: number }>;
}

export const generateResumeAnalytics = (resumes: ResumeDetail[]): ResumeAnalytics => {
    const analytics: ResumeAnalytics = {
        totalResumes: resumes.length,
        statusBreakdown: {},
        sourceBreakdown: {},
        averageMatchScore: 0,
        topSkills: [],
        experienceDistribution: {},
        locationDistribution: {},
        uploadTrends: []
    };

    // Status breakdown
    resumes.forEach(resume => {
        analytics.statusBreakdown[resume.status] = (analytics.statusBreakdown[resume.status] || 0) + 1;
    });

    // Source breakdown
    resumes.forEach(resume => {
        analytics.sourceBreakdown[resume.source] = (analytics.sourceBreakdown[resume.source] || 0) + 1;
    });

    // Average match score
    const resumesWithScores = resumes.filter(r => r.matchScore);
    if (resumesWithScores.length > 0) {
        analytics.averageMatchScore = resumesWithScores.reduce((sum, r) => sum + (r.matchScore || 0), 0) / resumesWithScores.length;
    }

    // Top skills
    const skillCounts: Record<string, number> = {};
    resumes.forEach(resume => {
        resume.skills.forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
    });
    analytics.topSkills = Object.entries(skillCounts)
        .map(([skill, count]) => ({ skill, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    // Experience distribution
    resumes.forEach(resume => {
        const years = parseInt(resume.experience);
        let category = '10+ years';
        if (years <= 2) category = '0-2 years';
        else if (years <= 5) category = '3-5 years';
        else if (years <= 10) category = '6-10 years';

        analytics.experienceDistribution[category] = (analytics.experienceDistribution[category] || 0) + 1;
    });

    // Location distribution
    resumes.forEach(resume => {
        const city = resume.location.split(',')[0].trim();
        analytics.locationDistribution[city] = (analytics.locationDistribution[city] || 0) + 1;
    });

    // Upload trends (last 30 days)
    const uploadCounts: Record<string, number> = {};
    const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
    });

    last30Days.forEach(date => {
        uploadCounts[date] = resumes.filter(resume =>
            resume.uploadDate.startsWith(date)
        ).length;
    });

    analytics.uploadTrends = Object.entries(uploadCounts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

    return analytics;
};

export const calculateMatchingEfficiency = (resumes: ResumeDetail[]): number => {
    const indexedResumes = resumes.filter(r => r.status === 'indexed' || r.status === 'matched');
    const matchedResumes = resumes.filter(r => r.matchedJobs.length > 0);

    if (indexedResumes.length === 0) return 0;
    return (matchedResumes.length / indexedResumes.length) * 100;
};

export const getTopPerformingSkills = (resumes: ResumeDetail[]): Array<{ skill: string; avgMatchScore: number }> => {
    const skillScores: Record<string, number[]> = {};

    resumes.forEach(resume => {
        if (resume.matchScore) {
            resume.skills.forEach(skill => {
                if (!skillScores[skill]) skillScores[skill] = [];
                skillScores[skill].push(resume.matchScore!);
            });
        }
    });

    return Object.entries(skillScores)
        .map(([skill, scores]) => ({
            skill,
            avgMatchScore: scores.reduce((sum, score) => sum + score, 0) / scores.length
        }))
        .sort((a, b) => b.avgMatchScore - a.avgMatchScore)
        .slice(0, 10);
};