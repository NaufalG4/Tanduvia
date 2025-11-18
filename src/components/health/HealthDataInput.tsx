import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { CalendarIcon, Plus, Save } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner@2.0.3';
import { ChildHealthData } from '../../types/health';
import { calculateNutritionalStatusWHO } from '../../utils/nutrition'; // ⬅️ pakai WHO

interface HealthDataInputProps {
  onSubmit?: (data: ChildHealthData) => void;
}

export function HealthDataInput({ onSubmit }: HealthDataInputProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    parentName: '',
    notes: ''
  });
  const [checkupDate, setCheckupDate] = useState<Date>();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // formatIndonesianDate masih kamu simpan, walau belum dipakai. Biarin.
  const formatIndonesianDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.weight ||
      !formData.height ||
      !formData.parentName ||
      !checkupDate
    ) {
      toast.error('Semua field wajib diisi!');
      return;
    }

    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    // ⬇️ pakai standar WHO, bukan rumus manual lagi
    const nutritionalStatus = calculateNutritionalStatusWHO({
      age,
      height,
      weight,
      gender: formData.gender as 'male' | 'female',
    });

    // GrowthRecord: age, weight, height, date
    const growthPoint = {
      age,                                // in months
      weight,                             // in kg
      height,                             // in cm
      date: format(checkupDate, 'yyyy-MM-dd'),
    };

    const newEntry: ChildHealthData = {
      id: Date.now().toString(),
      ...formData,
      age,
      weight,
      height,
      checkupDate: format(checkupDate, 'yyyy-MM-dd'),
      nutritionalStatus,
      gender: formData.gender as 'male' | 'female',
      growthHistory: [growthPoint],
    };

    console.log('Data Pemeriksaan Baru:', newEntry);

    toast.success('Data pemeriksaan berhasil disimpan!', {
      description: `${formData.name} - Status: ${nutritionalStatus}`,
    });

    setFormData({
      name: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      parentName: '',
      notes: '',
    });
    setCheckupDate(undefined);

    if (onSubmit) {
      onSubmit(newEntry);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-gray-900">Input Data Pemeriksaan Posyandu</h1>
          <p className="text-gray-600">
            Masukkan data hasil pemeriksaan kesehatan bulanan anak di posyandu
          </p>
        </div>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Form Pemeriksaan Kesehatan Anak
            </CardTitle>
            <CardDescription>
              Isi semua informasi dengan lengkap dan akurat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Child Information */}
              <div className="space-y-4">
                <h3 className="text-gray-900">Informasi Anak</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap Anak *</Label>
                    <Input
                      id="name"
                      placeholder="Contoh: Aisyah Putri"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Usia (bulan) *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Contoh: 24"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      min="0"
                      max="60"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Jenis Kelamin *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Laki-laki</SelectItem>
                        <SelectItem value="female">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentName">Nama Orang Tua/Wali *</Label>
                    <Input
                      id="parentName"
                      placeholder="Contoh: Siti Nurhaliza"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Measurement Data */}
              <div className="space-y-4">
                <h3 className="text-gray-900">Data Pengukuran</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Berat Badan (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 12.5"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Tinggi Badan (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 87"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      min="0"
                    />
                  </div>
                </div>

                {/* Tanggal Pemeriksaan */}
                <div className="space-y-2">
                  <Label htmlFor="checkupDate">Tanggal Pemeriksaan *</Label>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <Input
                      id="checkupDate"
                      type="date"
                      value={checkupDate ? format(checkupDate, 'yyyy-MM-dd') : ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCheckupDate(value ? new Date(value) : undefined);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Tambahan</Label>
                <Textarea
                  id="notes"
                  placeholder="Catatan khusus tentang kondisi anak (opsional)"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Catatan:</strong> Pastikan semua data yang dimasukkan akurat. Status gizi akan dihitung otomatis berdasarkan standar WHO untuk anak Indonesia.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  Simpan Data Pemeriksaan
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      name: '',
                      age: '',
                      gender: '',
                      weight: '',
                      height: '',
                      parentName: '',
                      notes: ''
                    });
                    setCheckupDate(undefined);
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">Status Gizi Normal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-800">
                Anak dengan pertumbuhan berat dan tinggi badan sesuai dengan standar usia. Terus berikan nutrisi seimbang.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900">Stunting / Wasting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-800">
                Kondisi dimana tinggi atau berat badan anak di bawah standar. Diperlukan intervensi nutrisi dan konsultasi ke tenaga kesehatan.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}