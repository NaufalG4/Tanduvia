// src/components/health/HealthHeader.tsx
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  LayoutDashboard,
  BookOpen,
  LogOut,
  Edit3,
  Menu,
} from 'lucide-react';

// helper kecil pengganti ../../lib/utils
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

type PageType = 'dashboard' | 'education' | 'input' | 'nutrition';

type UserRole = 'admin' | 'parent' | 'nutritionist' | null;

interface HealthHeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType | 'landing') => void;
  userRole: UserRole;
  userName: string;
  onLogout: () => void;
}

const getRoleLabel = (role: UserRole) => {
  if (role === 'admin') return 'Petugas Posyandu';
  if (role === 'parent') return 'Orang Tua';
  if (role === 'nutritionist') return 'Ahli Gizi';
  return '';
};

const getRoleBadgeClass = (role: UserRole) => {
  if (role === 'admin') return 'bg-indigo-100 text-indigo-700';
  if (role === 'parent') return 'bg-slate-100 text-slate-700';
  if (role === 'nutritionist') return 'bg-emerald-100 text-emerald-700';
  return '';
};

export function HealthHeader({
  currentPage,
  onNavigate,
  userRole,
  userName,
  onLogout,
}: HealthHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageType) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  const handleLogoutClick = () => {
    setMobileOpen(false);
    onNavigate('landing'); // sudah memanggil handleLogout di App
    onLogout?.();
  };

  return (
    <>
      {/* HEADER UTAMA */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo / Title */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <span className="text-lg font-bold">♥</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Tanduvia: Posyandu Digital
              </p>
              <p className="text-xs text-gray-500">
                Monitoring gizi & tumbuh kembang balita
              </p>
            </div>
          </div>

          {/* NAV DESKTOP (md ke atas) */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'gap-2 rounded-full',
                currentPage === 'dashboard' && 'bg-gray-900 text-white'
              )}
              onClick={() => handleNav('dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>

            {userRole === 'admin' && (
              <Button
                variant={currentPage === 'input' ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'gap-2 rounded-full',
                  currentPage === 'input' && 'bg-gray-900 text-white'
                )}
                onClick={() => handleNav('input')}
              >
                <Edit3 className="h-4 w-4" />
                Input Data
              </Button>
            )}

            {userRole === 'nutritionist' && (
              <Button
                variant={currentPage === 'nutrition' ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'gap-2 rounded-full',
                  currentPage === 'nutrition' && 'bg-gray-900 text-white'
                )}
                onClick={() => handleNav('nutrition')}
              >
                <Edit3 className="h-4 w-4" />
                Kelola Gizi
              </Button>
            )}

            <Button
              variant={currentPage === 'education' ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'gap-2 rounded-full',
                currentPage === 'education' && 'bg-gray-900 text-white'
              )}
              onClick={() => handleNav('education')}
            >
              <BookOpen className="h-4 w-4" />
              Panduan Gizi
            </Button>
          </nav>

          {/* USER INFO & BTN (DESKTOP) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              {userRole && (
                <span
                  className={
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ' +
                    getRoleBadgeClass(userRole)
                  }
                >
                  {getRoleLabel(userRole)}
                </span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full"
              onClick={handleLogoutClick}
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </div>

          {/* TOMBOL MOBILE (md ke bawah) */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="text-right">
              <p className="text-xs font-medium text-gray-900 truncate max-w-[90px]">
                {userName}
              </p>
              {userRole && (
                <span
                  className={
                    'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ' +
                    getRoleBadgeClass(userRole)
                  }
                >
                  {getRoleLabel(userRole)}
                </span>
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setMobileOpen(prev => !prev)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* PANEL MENU MOBILE */}
      {mobileOpen && (
        <div className="md:hidden border-b bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-3 pt-2">
            <Button
              variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              className="justify-start rounded-full"
              onClick={() => handleNav('dashboard')}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>

            {userRole === 'admin' && (
              <Button
                variant={currentPage === 'input' ? 'default' : 'ghost'}
                size="sm"
                className="justify-start rounded-full"
                onClick={() => handleNav('input')}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Input Data
              </Button>
            )}

            {userRole === 'nutritionist' && (
              <Button
                variant={currentPage === 'nutrition' ? 'default' : 'ghost'}
                size="sm"
                className="justify-start rounded-full"
                onClick={() => handleNav('nutrition')}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Kelola Gizi
              </Button>
            )}

            <Button
              variant={currentPage === 'education' ? 'default' : 'ghost'}
              size="sm"
              className="justify-start rounded-full"
              onClick={() => handleNav('education')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Panduan Gizi
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="mt-1 justify-start rounded-full"
              onClick={handleLogoutClick}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
