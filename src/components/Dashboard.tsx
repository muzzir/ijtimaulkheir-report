import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ReportForm from './ReportForm';
import Report from './Report';
import Logo from './Logo';
import type { ReportData } from '../types/report';
import { usePDF } from 'react-to-pdf';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const { toPDF, targetRef } = usePDF({
    filename: 'ijtimaulkheir-report.pdf',
    page: { margin: 20 }
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = (data: ReportData) => {
    setReportData(data);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo size="md" showName={true} />
          <div className="flex items-center gap-4">
            {reportData && !editMode && (
              <button
                onClick={() => toPDF()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download PDF
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {(!reportData || editMode) ? (
          <ReportForm onSubmit={handleSubmit} initialData={editMode ? reportData : undefined} />
        ) : (
          <>
            <div className="print:hidden mb-8 flex justify-center gap-4">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Edit Report
              </button>
              <button
                onClick={() => toPDF()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download PDF
              </button>
            </div>
            <div ref={targetRef}>
              <Report data={reportData} isPdfVersion={true} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}