import { useState } from 'react';
import { LandingPage } from './components/health/LandingPage';
import { LoginPage } from './components/health/LoginPage';
import { HealthHeader } from './components/health/HealthHeader';
import { HealthDashboard } from './components/health/HealthDashboard';
import { ParentDashboard } from './components/health/ParentDashboard';
import { NutritionEducation } from './components/health/NutritionEducation';
import { HealthDataInput } from './components/health/HealthDataInput';
import { Toaster } from './components/ui/sonner';
import { childrenHealthData } from './data/mockHealthData';
import { ChildHealthData } from './types/health';

type UserRole = 'admin' | 'parent' | null;
type PageType = 'landing' | 'login' | 'dashboard' | 'education' | 'input';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [healthData, setHealthData] = useState<ChildHealthData[]>(childrenHealthData);

  // Data khusus untuk orang tua: hanya lihat anak dengan parentName = nama login
  const parentChildren = healthData.filter(
    (child) =>
      child.parentName.trim().toLowerCase() === userName.trim().toLowerCase()
  );

  // Handler untuk mulai dari landing page (ke login)
  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  // Handler untuk pelajari lebih lanjut
  const handleLearnMore = () => {
    setCurrentPage('education');
  };

  // Handler untuk login
  const handleLogin = (role: 'admin' | 'parent', name: string) => {
    setUserRole(role);
    setUserName(name);
    setCurrentPage('dashboard');
  };

  // Handler untuk logout
  const handleLogout = () => {
    setUserRole(null);
    setUserName('');
    setCurrentPage('landing');
    // Kalau mau reset data ke mock awal saat logout, bisa buka komentar ini:
    // setHealthData(childrenHealthData);
  };

  // Handler untuk navigasi dari header
  const handleNavigate = (page: PageType) => {
    if (page === 'landing') {
      handleLogout();
    } else {
      setCurrentPage(page);
    }
  };

  // Handler untuk menambah data baru (hanya admin)
  const handleAddHealthData = (newData: ChildHealthData) => {
    setHealthData((prev) => [newData, ...prev]);
    // Navigasi ke dashboard setelah submit
    setCurrentPage('dashboard');
  };

  // Landing page
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} />
        <Toaster />
      </>
    );
  }

  // Login page
  if (currentPage === 'login') {
    return (
      <>
        <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />
        <Toaster />
      </>
    );
  }

  // Education page dapat diakses tanpa login
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
        currentPage={currentPage as 'dashboard' | 'education' | 'input'}
        onNavigate={handleNavigate}
        userRole={userRole}
        userName={userName}
        onLogout={handleLogout}
      />
      <main>
        {currentPage === 'dashboard' ? (
          userRole === 'admin' ? (
            <HealthDashboard
              children={healthData}
              onStartInput={() => setCurrentPage('input')}
            />
          ) : (
            <ParentDashboard
              children={parentChildren}  // ← hanya anak milik ibu itu
              parentName={userName}
            />
          )
        ) : currentPage === 'input' ? (
          userRole === 'admin' ? (
            <HealthDataInput onSubmit={handleAddHealthData} />
          ) : (
            // Orang tua tidak bisa akses input
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
          <NutritionEducation />
        )}
      </main>
      <Toaster />
    </div>
  );
}
