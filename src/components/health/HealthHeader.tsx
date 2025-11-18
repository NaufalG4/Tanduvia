// src/components/health/HealthHeader.tsx
import { Button } from '../ui/button';
import { cn } from '../../lib/utils'; // kalau di project-mu pakai helper lain, sesuaikan
import { LayoutDashboard, BookOpen, LogOut, Edit3 } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
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

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {/* Dashboard selalu ada untuk user logged-in */}
          <Button
            variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'gap-2 rounded-full',
              currentPage === 'dashboard' && 'bg-gray-900 text-white'
            )}
            onClick={() => onNavigate('dashboard')}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>

          {/* Input data hanya untuk admin (petugas posyandu) */}
          {userRole === 'admin' && (
            <Button
              variant={currentPage === 'input' ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'gap-2 rounded-full',
                currentPage === 'input' && 'bg-gray-900 text-white'
              )}
              onClick={() => onNavigate('input')}
            >
              <Edit3 className="h-4 w-4" />
              Input Data
            </Button>
          )}

          {/* Halaman kelola gizi khusus ahli gizi */}
          {userRole === 'nutritionist' && (
            <Button
              variant={currentPage === 'nutrition' ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'gap-2 rounded-full',
                currentPage === 'nutrition' && 'bg-gray-900 text-white'
              )}
              onClick={() => onNavigate('nutrition')}
            >
              <Edit3 className="h-4 w-4" />
              Kelola Gizi
            </Button>
          )}

          {/* Pendidikan gizi bisa diakses semua role */}
          <Button
            variant={currentPage === 'education' ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'gap-2 rounded-full',
              currentPage === 'education' && 'bg-gray-900 text-white'
            )}
            onClick={() => onNavigate('education')}
          >
            <BookOpen className="h-4 w-4" />
            Panduan Gizi
          </Button>
        </nav>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            {userRole && (
              <span
                className={
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ' +
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
            onClick={() => onNavigate('landing')}
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </div>
      </div>
    </header>
  );
}
