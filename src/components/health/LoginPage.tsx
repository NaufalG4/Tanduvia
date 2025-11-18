// src/components/health/LoginPage.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'parent' | 'nutritionist', name: string) => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'parent' | 'nutritionist' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Nama tidak boleh kosong.');
      return;
    }

    if (!role) {
      alert('Silakan pilih peran terlebih dahulu.');
      return;
    }

    onLogin(role, name.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>
          <CardTitle>Masuk ke Sistem Pemantauan Gizi Balita</CardTitle>
          <CardDescription>
            Pilih peran Anda dan masukkan identitas untuk mengakses dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                placeholder="Contoh: Ibu Aisyah / Kader Lilis / dr. Rina"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Peran */}
            <div className="space-y-2">
              <Label>Masuk sebagai</Label>
              <Select
                value={role}
                onValueChange={(value) =>
                  setRole(value as 'admin' | 'parent' | 'nutritionist')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih peran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    Kader Posyandu / Petugas Lapangan
                  </SelectItem>
                  <SelectItem value="parent">
                    Ibu Balita / Orang Tua
                  </SelectItem>
                  <SelectItem value="nutritionist">
                    Ahli Gizi / Tenaga Kesehatan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 space-y-1">
              <p><strong>Kader:</strong> dapat mengelola data pemeriksaan dan input BB/TB.</p>
              <p><strong>Ibu balita:</strong> hanya dapat melihat perkembangan gizi anaknya sendiri.</p>
              <p><strong>Ahli gizi:</strong> fokus pada analisis balita berisiko stunting/wasting.</p>
            </div>

            {/* Tombol submit */}
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
