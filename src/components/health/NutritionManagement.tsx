// src/components/health/NutritionManagement.tsx
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Salad, Plus, Save, ListFilter } from 'lucide-react';
import type { NutritionalGuideline } from '../../types/health';

interface NutritionManagementProps {
  guidelines: NutritionalGuideline[];
}

export function NutritionManagement({ guidelines }: NutritionManagementProps) {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [items, setItems] = useState<NutritionalGuideline[]>(guidelines);

  const [form, setForm] = useState({
    title: '',
    ageGroup: '',
    description: '',
    foods: '',
  });

  const ageGroups = Array.from(
    new Set(items.map((g) => g.ageGroup))
  );

  const filtered = selectedAgeGroup === 'all'
    ? items
    : items.filter((g) => g.ageGroup === selectedAgeGroup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.ageGroup.trim() || !form.description.trim()) {
      alert('Judul, kelompok usia, dan deskripsi wajib diisi.');
      return;
    }

    const newItem: NutritionalGuideline = {
      id: `gizi-${Date.now()}`,
      title: form.title.trim(),
      ageGroup: form.ageGroup.trim(),
      description: form.description.trim(),
      foods: form.foods
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      icon: 'custom',
    };

    setItems((prev) => [newItem, ...prev]);

    setForm({
      title: '',
      ageGroup: '',
      description: '',
      foods: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="mb-2 text-gray-900">Kelola Informasi Gizi Balita</h1>
          <p className="text-gray-600">
            Halaman khusus ahli gizi untuk menyusun, meninjau, dan memperbarui panduan gizi berdasarkan kelompok usia dan status gizi balita.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daftar panduan gizi */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Panduan Gizi yang Berlaku</CardTitle>
                <CardDescription>
                  Daftar panduan gizi berdasarkan kelompok usia dan kondisi balita.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <ListFilter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedAgeGroup}
                  onChange={(e) => setSelectedAgeGroup(e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm"
                >
                  <option value="all">Semua Kelompok Usia</option>
                  {ageGroups.map((ag) => (
                    <option key={ag} value={ag}>
                      {ag}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-600">
                  Belum ada panduan gizi untuk filter yang dipilih. Silakan tambahkan panduan baru di sisi kanan.
                </p>
              ) : (
                <ScrollArea className="max-h-[480px] pr-4">
                  <div className="space-y-4">
                    {filtered.map((gizi) => (
                      <Card key={gizi.id} className="border">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Salad className="h-4 w-4 text-green-600" />
                                {gizi.title}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                Kelompok usia: <span className="font-medium text-gray-800">{gizi.ageGroup}</span>
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Panduan Gizi
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-1 space-y-2">
                          <p className="text-sm text-gray-700">
                            {gizi.description}
                          </p>
                          {gizi.foods && gizi.foods.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-semibold text-gray-700 mb-1">
                                Contoh makanan yang direkomendasikan:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {gizi.foods.map((f) => (
                                  <Badge key={f} variant="outline" className="text-xs">
                                    {f}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Form tambah panduan gizi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Tambah / Sesuaikan Panduan
              </CardTitle>
              <CardDescription>
                Ahli gizi dapat menambahkan panduan baru sesuai kebutuhan di lapangan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Panduan *</Label>
                  <Input
                    id="title"
                    placeholder="Contoh: MPASI Tinggi Protein untuk Balita Berisiko"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageGroup">Kelompok Usia / Kondisi *</Label>
                  <Input
                    id="ageGroup"
                    placeholder="Contoh: 6-12 bulan / Berisiko stunting"
                    value={form.ageGroup}
                    onChange={(e) => setForm((prev) => ({ ...prev, ageGroup: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi / Catatan *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Jelaskan tujuan, fokus gizi, dan hal yang perlu diperhatikan."
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foods">Contoh Makanan (pisahkan dengan koma)</Label>
                  <Textarea
                    id="foods"
                    rows={3}
                    placeholder="Contoh: telur, ikan, daging ayam, hati ayam, buah pepaya"
                    value={form.foods}
                    onChange={(e) => setForm((prev) => ({ ...prev, foods: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  Simpan Panduan Gizi
                </Button>
              </form>

              <p className="text-[11px] text-gray-500 mt-3">
                *Catatan: pada implementasi produksi, data ini sebaiknya disimpan di basis data sehingga bisa diakses lintas perangkat dan jadwal posyandu.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
