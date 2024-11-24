export type StudentLevel = 'Qaida' | 'Quran' | 'QuranAndKitab' | 'Hifz';
export type ReportType = 'monthly' | 'quarterly' | 'yearly';

export interface BranchDetails {
  name: string;
  location: string;
}

export interface Statistics {
  totalStudents: number;
  studentsPerLevel: Record<StudentLevel, number>;
  teachers: number;
  attendancePercentage: number;
}

export interface Activity {
  title: string;
  date: string;
  description: string;
}

export interface Performance {
  teacherName: string;
  rating: number;
  feedback: string;
  studentsHandled: number;
}

export interface ReportData {
  branch: BranchDetails;
  statistics: Statistics;
  activities: Activity[];
  performances: Performance[];
  feedback: string;
  reportType: ReportType;
  period: string;
}