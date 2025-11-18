import { Heart, BookOpen, Home, Menu, X, ClipboardPlus, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Badge } from '../ui/badge';

interface HealthHeaderProps {
  currentPage: 'dashboard' | 'education' | 'input';
  onNavigate: (page: 'dashboard' | 'education' | 'input' | 'landing') => void;
  userRole?: 'admin' | 'parent' | null;
  userName?: string;
  onLogout?: () => void;
}

export function HealthHeader({ currentPage, onNavigate, userRole, userName, onLogout }: HealthHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Heart className="h-5 w-5" fill="currentColor" />
            </div>
            <span className="text-gray-900 hidden sm:inline">Tanduvia: Posyandu Digital</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button
              variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => onNavigate('dashboard')}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            
            {/* Input hanya untuk admin */}
            {userRole === 'admin' && (
              <Button
                variant={currentPage === 'input' ? 'default' : 'ghost'}
                onClick={() => onNavigate('input')}
                className="gap-2"
              >
                <ClipboardPlus className="h-4 w-4" />
                Input Data
              </Button>
            )}
            
            <Button
              variant={currentPage === 'education' ? 'default' : 'ghost'}
              onClick={() => onNavigate('education')}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Panduan Gizi
            </Button>

            {/* User Info & Logout */}
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-600" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">{userName}</span>
                  <Badge variant="secondary" className="text-xs">
                    {userRole === 'admin' ? 'Petugas' : 'Orang Tua'}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              {/* User Info */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg mb-2">
                <User className="h-4 w-4 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-600">
                    {userRole === 'admin' ? 'Petugas Posyandu' : 'Orang Tua'}
                  </p>
                </div>
              </div>

              <Button
                variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="gap-2 justify-start"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>

              {userRole === 'admin' && (
                <Button
                  variant={currentPage === 'input' ? 'default' : 'ghost'}
                  onClick={() => {
                    onNavigate('input');
                    setMobileMenuOpen(false);
                  }}
                  className="gap-2 justify-start"
                >
                  <ClipboardPlus className="h-4 w-4" />
                  Input Data
                </Button>
              )}

              <Button
                variant={currentPage === 'education' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('education');
                  setMobileMenuOpen(false);
                }}
                className="gap-2 justify-start"
              >
                <BookOpen className="h-4 w-4" />
                Panduan Gizi
              </Button>

              <div className="border-t border-gray-200 my-2"></div>

              <Button
                variant="outline"
                onClick={() => {
                  onLogout?.();
                  setMobileMenuOpen(false);
                }}
                className="gap-2 justify-start"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}