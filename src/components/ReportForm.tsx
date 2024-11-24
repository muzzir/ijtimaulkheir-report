import React, { useState } from 'react';
import { BookOpen, Users, GraduationCap, School, X } from 'lucide-react';
import type { ReportData, StudentLevel, ReportType } from '../types/report';

interface ReportFormProps {
  onSubmit: (data: ReportData) => void;
  initialData?: ReportData | null;
}

const studentLevels: { value: StudentLevel; label: string }[] = [
  { value: 'Qaida', label: 'Qaida' },
  { value: 'Quran', label: 'Quran' },
  { value: 'QuranAndKitab', label: 'Quran and Kitab' },
  { value: 'Hifz', label: 'Hifz' }
];

const reportTypes: { value: ReportType; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' }
];

const defaultFormData: ReportData = {
  branch: { name: '', location: '' },
  statistics: {
    totalStudents: 0,
    studentsPerLevel: {
      Qaida: 0,
      Quran: 0,
      QuranAndKitab: 0,
      Hifz: 0
    },
    teachers: 0,
    attendancePercentage: 0
  },
  activities: [],
  performances: [],
  feedback: '',
  reportType: 'monthly',
  period: ''
};

export default function ReportForm({ onSubmit, initialData }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportData>(initialData || defaultFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, { title: '', date: '', description: '' }]
    }));
  };

  const removeActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const addPerformance = () => {
    setFormData(prev => ({
      ...prev,
      performances: [...prev.performances, { teacherName: '', rating: 0, feedback: '', studentsHandled: 0 }]
    }));
  };

  const removePerformance = (index: number) => {
    setFormData(prev => ({
      ...prev,
      performances: prev.performances.filter((_, i) => i !== index)
    }));
  };

  const getPlaceholder = () => {
    switch (formData.reportType) {
      case 'monthly':
        return 'March 2024';
      case 'quarterly':
        return 'Q1 2024';
      case 'yearly':
        return '2024';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <School className="w-6 h-6" />
          Branch Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.branch.name}
              onChange={e => setFormData(prev => ({
                ...prev,
                branch: { ...prev.branch, name: e.target.value }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.branch.location}
              onChange={e => setFormData(prev => ({
                ...prev,
                branch: { ...prev.branch, location: e.target.value }
              }))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Statistics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentLevels.map(({ value, label }) => (
            <div key={value}>
              <label className="block text-sm font-medium text-gray-700">
                {label} Students
              </label>
              <input
                type="number"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
                value={formData.statistics.studentsPerLevel[value] || ''}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  statistics: {
                    ...prev.statistics,
                    studentsPerLevel: {
                      ...prev.statistics.studentsPerLevel,
                      [value]: parseInt(e.target.value) || 0
                    }
                  }
                }))}
              />
            </div>
          ))}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Teachers</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.statistics.teachers || ''}
              onChange={e => setFormData(prev => ({
                ...prev,
                statistics: { ...prev.statistics, teachers: parseInt(e.target.value) || 0 }
              }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Attendance %</label>
            <input
              type="number"
              required
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.statistics.attendancePercentage || ''}
              onChange={e => setFormData(prev => ({
                ...prev,
                statistics: { ...prev.statistics, attendancePercentage: parseInt(e.target.value) || 0 }
              }))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Activities & Achievements
          </h2>
          <button
            type="button"
            onClick={addActivity}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Activity
          </button>
        </div>
        
        {formData.activities.map((_, index) => (
          <div key={index} className="space-y-4 relative border rounded-lg p-4">
            <button
              type="button"
              onClick={() => removeActivity(index)}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Activity Title"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.activities[index].title}
              onChange={e => {
                const newActivities = [...formData.activities];
                newActivities[index].title = e.target.value;
                setFormData(prev => ({ ...prev, activities: newActivities }));
              }}
            />
            <input
              type="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.activities[index].date}
              onChange={e => {
                const newActivities = [...formData.activities];
                newActivities[index].date = e.target.value;
                setFormData(prev => ({ ...prev, activities: newActivities }));
              }}
            />
            <textarea
              placeholder="Description"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.activities[index].description}
              onChange={e => {
                const newActivities = [...formData.activities];
                newActivities[index].description = e.target.value;
                setFormData(prev => ({ ...prev, activities: newActivities }));
              }}
            />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Teacher Performance
          </h2>
          <button
            type="button"
            onClick={addPerformance}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Teacher
          </button>
        </div>
        
        {formData.performances.map((_, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative border rounded-lg p-4">
            <button
              type="button"
              onClick={() => removePerformance(index)}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Teacher Name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.performances[index].teacherName}
              onChange={e => {
                const newPerformances = [...formData.performances];
                newPerformances[index].teacherName = e.target.value;
                setFormData(prev => ({ ...prev, performances: newPerformances }));
              }}
            />
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.performances[index].rating || ''}
              onChange={e => {
                const newPerformances = [...formData.performances];
                newPerformances[index].rating = parseInt(e.target.value) || 0;
                setFormData(prev => ({ ...prev, performances: newPerformances }));
              }}
            />
            <input
              type="number"
              placeholder="Students Handled"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.performances[index].studentsHandled || ''}
              onChange={e => {
                const newPerformances = [...formData.performances];
                newPerformances[index].studentsHandled = parseInt(e.target.value) || 0;
                setFormData(prev => ({ ...prev, performances: newPerformances }));
              }}
            />
            <textarea
              placeholder="Feedback"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.performances[index].feedback}
              onChange={e => {
                const newPerformances = [...formData.performances];
                newPerformances[index].feedback = e.target.value;
                setFormData(prev => ({ ...prev, performances: newPerformances }));
              }}
            />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Report Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.reportType}
              onChange={e => setFormData(prev => ({
                ...prev,
                reportType: e.target.value as ReportType
              }))}
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Period</label>
            <input
              type="text"
              required
              placeholder={getPlaceholder()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
              value={formData.period}
              onChange={e => setFormData(prev => ({
                ...prev,
                period: e.target.value
              }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Feedback</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border"
            rows={4}
            value={formData.feedback}
            onChange={e => setFormData(prev => ({
              ...prev,
              feedback: e.target.value
            }))}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Generate Report
        </button>
      </div>
    </form>
  );
}