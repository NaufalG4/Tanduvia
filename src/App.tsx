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
type PageType =
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'education'
  | 'input'
  | 'nutrition';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [healthData, setHealthData] =
    useState<ChildHealthData[]>(childrenHealthData);

  // Data khusus parent: hanya anak dengan parentName = nama login
  const parentChildren = healthData.filter(
    (child) =>
      child.parentName.trim().toLowerCase() ===
      userName.trim().toLowerCase()
  );

  // Landing → Login
  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  // Landing → Panduan (tanpa login)
  const handleLearnMore = () => {
    setCurrentPage('education');
  };

  // Login 3 role
  const handleLogin = (
    role: 'admin' | 'parent' | 'nutritionist',
    name: string
  ) => {
    setUserRole(role);
    setUserName(name);

    if (role === 'nutritionist') {
      // Ahli gizi langsung ke halaman kelola gizi
      setCurrentPage('nutrition');
    } else {
      // Admin & orang tua → dashboard
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName('');
    setCurrentPage('landing');
    // Kalau mau reset data:
    // setHealthData(childrenHealthData);
  };

  const handleNavigate = (page: PageType | 'landing') => {
    if (page === 'landing') {
      handleLogout();
    } else {
      setCurrentPage(page);
    }
  };

  const handleAddHealthData = (newData: ChildHealthData) => {
    setHealthData((prev) => [newData, ...prev]);
    setCurrentPage('dashboard');
  };

  // LANDING (belum login)
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

  // LOGIN
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

  // PANDUAN tanpa login
  if (currentPage === 'education' && !userRole) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NutritionEducation />
        <Toaster />
      </div>
    );
  }

  // HALAMAN SETELAH LOGIN
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader
        currentPage={
          currentPage as 'dashboard' | 'education' | 'input' | 'nutrition'
        }
        onNavigate={handleNavigate}
        userRole={userRole}
        userName={userName}
        onLogout={handleLogout}
      />

      <main className="pt-4 md:pt-6 lg:pt-8">
        {/* 1. Ahli gizi: halaman utama = Kelola Gizi */}
        {userRole === 'nutritionist' && currentPage === 'nutrition' ? (
          <NutritionManagement guidelines={nutritionGuidelines} />
        ) : currentPage === 'dashboard' ? (
          // 2. DASHBOARD untuk admin & orang tua
          userRole === 'admin' ? (
            <HealthDashboard
              children={healthData}
              onStartInput={() => setCurrentPage('input')}
            />
          ) : (
            <ParentDashboard
              children={parentChildren}
              parentName={userName}
            />
          )
        ) : currentPage === 'input' ? (
          // 3. INPUT DATA (khusus admin)
          userRole === 'admin' ? (
            <HealthDataInput onSubmit={handleAddHealthData} />
          ) : (
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="text-center">
                <h2 className="mb-2 text-gray-900">Akses Terbatas</h2>
                <p className="text-gray-600">
                  Hanya petugas posyandu yang dapat menginput data
                  pemeriksaan.
                </p>
              </div>
            </div>
          )
        ) : (
          // 4. PANDUAN GIZI setelah login (role apa saja)
          <NutritionEducation />
        )}
      </main>

      <Toaster />
    </div>
  );
}
