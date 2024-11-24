import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ReportData } from '../types/report';
import { Users, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import Logo from './Logo';

const studentLevelLabels: Record<string, string> = {
  'Qaida': 'Qaida',
  'Quran': 'Quran',
  'QuranAndKitab': 'Quran and Kitab',
  'Hifz': 'Hifz'
};

export default function Report({ data, isPdfVersion = false }: { data: ReportData; isPdfVersion?: boolean }) {
  const levelData = Object.entries(data.statistics.studentsPerLevel).map(([name, value]) => ({
    name: studentLevelLabels[name] || name,
    students: value,
  }));

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="flex items-center justify-center gap-4 mb-6 pb-4 border-b page-break-inside-avoid">
        <Logo size="md" showName={false} className="flex-shrink-0" />
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Ijtimaulkheir Madresa</h1>
          <p className="text-gray-600 text-sm">Islamic Learning Center</p>
          <p className="text-lg font-medium text-green-700 mt-1">
            {data.reportType.charAt(0).toUpperCase() + data.reportType.slice(1)} Report - {data.period}
          </p>
          <p className="text-sm text-gray-500">{data.branch.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 page-break-inside-avoid">
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
            <BookOpen className="w-5 h-5" />
            Branch Information
          </h2>
          <p className="text-gray-700 break-words">Name: {data.branch.name}</p>
          <p className="text-gray-700 break-words">Location: {data.branch.location}</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
            <Users className="w-5 h-5" />
            Key Statistics
          </h2>
          <p className="text-gray-700">Total Students: {Object.values(data.statistics.studentsPerLevel).reduce((a, b) => a + b, 0)}</p>
          <p className="text-gray-700">Teachers: {data.statistics.teachers}</p>
          <p className="text-gray-700">Attendance: {data.statistics.attendancePercentage}%</p>
        </div>
      </div>

      <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200 page-break-inside-avoid">
        <h2 className="text-xl font-semibold mb-6 text-green-700">Student Distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={levelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-12 page-break-before-always">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-green-700">
          <BookOpen className="w-6 h-6" />
          Activities & Achievements
        </h2>
        <div className="space-y-4">
          {data.activities.map((activity, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200 page-break-inside-avoid">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">{activity.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 break-words">{activity.title}</h3>
              <p className="text-gray-700 mt-2 whitespace-pre-wrap break-words">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 page-break-before-always">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-green-700">
          <GraduationCap className="w-6 h-6" />
          Teacher Performance
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {data.performances.map((performance, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200 page-break-inside-avoid">
              <h3 className="font-semibold text-gray-800 break-words">{performance.teacherName}</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">Rating: {performance.rating}/5</p>
                <p className="text-sm text-gray-600">Students: {performance.studentsHandled}</p>
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap break-words">{performance.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.feedback && (
        <div className="mb-12 page-break-inside-avoid">
          <h2 className="text-xl font-semibold mb-6 text-green-700">Additional Feedback</h2>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap break-words">{data.feedback}</p>
          </div>
        </div>
      )}

      <footer className="text-center text-sm text-gray-600 mt-12 pt-6 border-t page-break-inside-avoid">
        <div className="flex justify-center mb-3">
          <Logo size="sm" showName={false} />
        </div>
        <p className="font-semibold text-green-700">Ijtimaulkheir Madresa</p>
        <p className="mt-1">Generated on {new Date().toLocaleDateString()}</p>
        <p className="text-xs text-gray-500">Islamic Learning Center - {data.branch.location}</p>
      </footer>
    </div>
  );
}