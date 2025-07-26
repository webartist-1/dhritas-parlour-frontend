// hooks/useResumeDetail.ts
import { useState, useCallback } from 'react';
import { ResumeDetail, WorkExperience } from '../types/resumeTypes';

export const useResumeDetail = (initialData: ResumeDetail) => {
  const [resumeDetail, setResumeDetail] = useState<ResumeDetail>(initialData);
  const [editedResume, setEditedResume] = useState<ResumeDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [candidateRating, setCandidateRating] = useState<number>(initialData.rating || 0);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    setEditedResume({ ...resumeDetail });
  }, [resumeDetail]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setEditedResume(null);
  }, []);

  const saveEdits = useCallback(() => {
    if (editedResume) {
      setResumeDetail({ ...editedResume, lastModified: new Date().toISOString() });
      setIsEditing(false);
      setEditedResume(null);
      console.log('Saving resume changes:', editedResume);
    }
  }, [editedResume]);

  const updateEditedField = useCallback((field: string, value: any) => {
    if (editedResume) {
      setEditedResume({ ...editedResume, [field]: value });
    }
  }, [editedResume]);

  const handleIndexResume = useCallback(async () => {
    setIsIndexing(true);
    setTimeout(() => {
      setResumeDetail(prev => ({
        ...prev,
        status: 'indexed',
        matchScore: 92,
        matchedJobs: [
          {
            jobId: '1',
            title: 'Senior Frontend Developer',
            department: 'Engineering',
            matchScore: 92,
            matchReasons: ['React expertise', '5+ years experience', 'AWS knowledge', 'TypeScript skills']
          },
          {
            jobId: '2',
            title: 'Full Stack Developer',
            department: 'Product',
            matchScore: 85,
            matchReasons: ['Full-stack experience', 'Node.js proficiency', 'MongoDB knowledge']
          }
        ]
      }));
      setIsIndexing(false);
    }, 3000);
  }, []);

  const handleFormatResume = useCallback(async () => {
    setIsFormatting(true);
    setTimeout(() => {
      setIsFormatting(false);
      console.log('Resume formatted successfully');
      alert('Resume has been formatted! Check your downloads folder.');
    }, 2000);
  }, []);

  return {
    resumeDetail,
    editedResume,
    isEditing,
    isIndexing,
    isFormatting,
    candidateRating,
    setCandidateRating,
    startEditing,
    cancelEditing,
    saveEdits,
    updateEditedField,
    handleIndexResume,
    handleFormatResume
  };
};
