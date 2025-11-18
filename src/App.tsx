// src/App.tsx
import { useState } from 'react';
import { LandingPage } from './components/health/LandingPage';
import { LoginPage } from './components/health/LoginPage';
import { HealthHeader } from './components/health/HealthHeader';
import { HealthDashboard } from './components/health/HealthDashboard';
import { ParentDashboard } from './components/health/ParentDashboard';
import { NutritionEducation } from './components/health/NutritionEducation';
import { HealthDataInput } from './components/health/HealthDataInput';
import { NutritionManagement } from './components/health/NutritionManagement';

import { Toaster } from './components/ui/sonner';
import { childrenHealthData } from './data/mockHealthData';
import { nutritionGuidelines } from './data/nutritionGuidelines';

import { ChildHealthData } from './types/health';

type UserRole = 'admin' | 'parent' | 'nutritionist' | null;
type PageType = 'landing' | 'login' | 'dashboard' | 'education' | 'input' | 'nutrition';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [healthData, setHealthData] = useState<ChildHealthData[]>(childrenHealthData);

  // Data khusus parent: hanya anak dengan parentName = nama login
  const parentChildren = healthData.filter(
    (child) =>
      child.parentName.trim().toLowerCase() === userName.trim().toLowerCase()
  );

  // Handler untuk mulai dari landing page (ke login)
  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  // Handler untuk pelajari lebih lanjut (tanpa login)
  const handleLearnMore = () => {
    setCurrentPage('education');
  };

  // Handler untuk login (3 role)
  const handleLogin = (
    role: 'admin' | 'parent' | 'nutritionist',
    name: string
  ) => {
    setUserRole(role);
    setUserName(name);

    if (role === 'nutritionist') {
      // ahli gizi diarahkan ke halaman kelola gizi
      setCurrentPage('nutrition');
    } else {
      // admin & parent ke dashboard
      setCurrentPage('dashboard');
    }
  };

  // Handler untuk logout
  const handleLogout = () => {
    setUserRole(null);
    setUserName('');
    setCurrentPage('landing');
    // Kalau mau reset data saat logout:
    // setHealthData(childrenHealthData);
  };

  // Handler untuk navigasi dari header
  const handleNavigate = (page: PageType | 'landing') => {
    if (page === 'landing') {
      handleLogout();
    } else {
      setCurrentPage(page);
    }
  };

  // Handler untuk menambah data baru (hanya kader/admin)
  const handleAddHealthData = (newData: ChildHealthData) => {
    setHealthData((prev) => [newData, ...prev]);
    setCurrentPage('dashboard');
  };

  // Landing page (belum login)
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage
          onGetStarted={handleGetStarted}
          onLearnMore={handleLearnMore}
        />
        <Toaster />
      </>
    );
  }

  // Login page
  if (currentPage === 'login') {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onBack={() => setCurrentPage('landing')}
        />
        <Toaster />
      </>
    );
  }

  // Education page bisa diakses tanpa login
  if (currentPage === 'education' && !userRole) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NutritionEducation />
        <Toaster />
      </div>
    );
  }

  // Halaman setelah login
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader
        currentPage={currentPage as 'dashboard' | 'education' | 'input' | 'nutrition'}
        onNavigate={handleNavigate}
        userRole={userRole}
        userName={userName}
        onLogout={handleLogout}
      />

      <main>
        {/* Halaman khusus ahli gizi */}
        {userRole === 'nutritionist' && currentPage === 'nutrition' ? (
          <NutritionManagement guidelines={nutritionGuidelines} />
        ) : currentPage === 'dashboard' ? (
          // DASHBOARD
          userRole === 'admin' ? (
            // Kader / petugas posyandu
            <HealthDashboard
              children={healthData}
              onStartInput={() => setCurrentPage('input')}
            />
          ) : userRole === 'nutritionist' ? (
            // Kalau nutritionist buka "Dashboard", anggap sama dengan halaman gizi
            <NutritionManagement guidelines={nutritionGuidelines} />
          ) : (
            // Ibu balita / orang tua
            <ParentDashboard children={parentChildren} parentName={userName} />
          )
        ) : currentPage === 'input' ? (
          // INPUT DATA
          userRole === 'admin' ? (
            <HealthDataInput onSubmit={handleAddHealthData} />
          ) : (
            // Ibu & ahli gizi tidak boleh input pemeriksaan
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="text-center">
                <h2 className="mb-2 text-gray-900">Akses Terbatas</h2>
                <p className="text-gray-600">
                  Hanya petugas posyandu yang dapat menginput data pemeriksaan.
                </p>
              </div>
            </div>
          )
        ) : (
          // currentPage === 'education' saat SUDAH login
          <NutritionEducation />
        )}
      </main>

      <Toaster />
    </div>
  );
}
