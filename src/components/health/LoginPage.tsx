import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Heart, UserCircle, Shield, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'parent', name: string) => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'parent' | null>(null);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && name.trim()) {
      onLogin(selectedRole, name.trim());
    }
  };

  // Jika belum pilih role, tampilkan pilihan role
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Button>
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
                <Heart className="h-12 w-12" fill="currentColor" />
              </div>
            </div>
            <h1 className="mb-3 text-gray-900">Pilih Jenis Akun</h1>
            <p className="text-lg text-gray-600">
              Silakan pilih jenis akun sesuai dengan peran Anda
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Parent Role */}
            <Card 
              className="border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setSelectedRole('parent')}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-100 p-6 rounded-2xl group-hover:bg-purple-200 transition-colors">
                    <UserCircle className="h-16 w-16 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Akun Ibu Balita</CardTitle>
                <CardDescription className="text-base">
                  Untuk orang tua yang ingin memantau kesehatan anak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    </div>
                    Melihat data kesehatan anak Anda
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    </div>
                    Kurva pertumbuhan dengan standar WHO
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    </div>
                    Notifikasi status gizi anak
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    </div>
                    Akses panduan nutrisi dan edukasi
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
                  onClick={() => setSelectedRole('parent')}
                >
                  Masuk sebagai Ibu Balita
                </Button>
              </CardContent>
            </Card>

            {/* Admin Role */}
            <Card 
              className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setSelectedRole('admin')}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-6 rounded-2xl group-hover:bg-blue-200 transition-colors">
                    <Shield className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Akun Kader/Petugas Gizi</CardTitle>
                <CardDescription className="text-base">
                  Untuk petugas posyandu dan tenaga kesehatan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    </div>
                    Input data pemeriksaan semua balita
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    </div>
                    Dashboard lengkap semua data kesehatan
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    </div>
                    Monitoring status gizi seluruh balita
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    </div>
                    Laporan dan analisis statistik
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setSelectedRole('admin')}
                >
                  Masuk sebagai Kader/Petugas
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info Box */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Sistem demo - tidak memerlukan password. Cukup masukkan nama Anda.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Form login dengan nama
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`${selectedRole === 'admin' ? 'bg-blue-100' : 'bg-purple-100'} p-4 rounded-2xl`}>
              {selectedRole === 'admin' ? (
                <Shield className={`h-12 w-12 ${selectedRole === 'admin' ? 'text-blue-600' : 'text-purple-600'}`} />
              ) : (
                <UserCircle className={`h-12 w-12 ${selectedRole === 'admin' ? 'text-blue-600' : 'text-purple-600'}`} />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl">
            {selectedRole === 'admin' ? 'Masuk sebagai Kader/Petugas' : 'Masuk sebagai Ibu Balita'}
          </CardTitle>
          <CardDescription>
            Silakan masukkan nama Anda untuk melanjutkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder={selectedRole === 'admin' ? 'Contoh: Bidan Siti' : 'Contoh: Ibu Ratna'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Mode Demo:</strong> Sistem ini untuk demonstrasi. Data yang Anda masukkan hanya tersimpan sementara.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setSelectedRole(null)}
                className="flex-1"
              >
                Kembali
              </Button>
              <Button 
                type="submit"
                className={`flex-1 ${selectedRole === 'admin' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                disabled={!name.trim()}
              >
                Masuk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
