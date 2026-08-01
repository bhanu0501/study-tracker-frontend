export const ACTIVITY_TYPES = [
  { value: 'STUDY', label: 'Study' },
  { value: 'REVISION', label: 'Revision' },
  { value: 'PRACTICE', label: 'Practice' },
  { value: 'MOCK_TEST', label: 'Mock Test' },
  { value: 'PROJECT', label: 'Project' },
  { value: 'READING', label: 'Reading' },
  { value: 'VIDEO_LEARNING', label: 'Video Learning' },
];

export const DIFFICULTY_LEVELS = [
  { value: 'EASY', label: 'Easy' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HARD', label: 'Hard' },
];

export const PRIORITIES = [
  { value: 'HIGH', label: 'High' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LOW', label: 'Low' },
];

export const STATUSES = [
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'PARTIALLY_COMPLETED', label: 'Partially Completed' },
  { value: 'SKIPPED', label: 'Skipped' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
];

export const STATUS_COLORS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PARTIALLY_COMPLETED: 'partial',
  SKIPPED: 'skipped',
};

export const DEFAULT_TOPICS = [
  'Java', 'Spring Boot', 'SQL', 'Operating System',
  'Reasoning', 'English', 'Data Structures', 'Algorithms',
  'System Design', 'Computer Networks',
];

export const getStatusLabel = (value) => {
  const status = STATUSES.find(s => s.value === value);
  return status ? status.label : value;
};

export const getActivityTypeLabel = (value) => {
  const type = ACTIVITY_TYPES.find(t => t.value === value);
  return type ? type.label : value;
};

export const getDifficultyLabel = (value) => {
  const diff = DIFFICULTY_LEVELS.find(d => d.value === value);
  return diff ? diff.label : value;
};

export const getPriorityLabel = (value) => {
  const p = PRIORITIES.find(pr => pr.value === value);
  return p ? p.label : value;
};
