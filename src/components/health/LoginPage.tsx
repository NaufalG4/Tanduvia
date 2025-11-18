// src/components/health/LoginPage.tsx
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type UserRole = 'admin' | 'parent' | 'nutritionist';

interface LoginPageProps {
  onLogin: (role: UserRole, name: string) => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('parent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin(role, name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Masuk ke Tanduvia</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                placeholder="Contoh: dr. Rina, S.Gz"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Masuk sebagai</Label>
              <div className="grid gap-2 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="parent"
                    checked={role === 'parent'}
                    onChange={() => setRole('parent')}
                  />
                  <span>Ibu / Orang Tua Balita</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                  />
                  <span>Petugas / Kader Posyandu</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="nutritionist"
                    checked={role === 'nutritionist'}
                    onChange={() => setRole('nutritionist')}
                  />
                  <span>Ahli Gizi</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onBack}
              >
                Kembali
              </Button>
              <Button type="submit" className="flex-1">
                Masuk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
