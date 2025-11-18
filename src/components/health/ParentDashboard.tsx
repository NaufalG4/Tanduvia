import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { GrowthChart } from './GrowthChart';
import { Badge } from '../ui/badge';
import { ChildHealthData } from '../../types/health';
import { Calendar, Weight, Ruler, Activity, AlertCircle, TrendingUp, Baby } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface ParentDashboardProps {
  children: ChildHealthData[];
  parentName: string;
}

export function ParentDashboard({ children, parentName }: ParentDashboardProps) {
  // Filter hanya anak dari parent ini (dalam demo, kita ambil anak pertama atau semua)
  const myChildren = children;

  if (myChildren.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-gray-900">Dashboard Saya</h1>
            <p className="text-gray-600">
              Selamat datang, <span className="font-medium">{parentName}</span>
            </p>
          </div>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-6 rounded-2xl">
                  <Baby className="h-16 w-16 text-blue-600" />
                </div>
              </div>
              <h3 className="mb-2 text-gray-900">Belum Ada Data Anak</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Saat ini belum ada data pemeriksaan untuk anak Anda. 
                Silakan hubungi petugas posyandu untuk melakukan pemeriksaan dan input data.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const latestChild = myChildren[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'stunted':
      case 'wasted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'severely-stunted':
      case 'severely-wasted':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal':
        return 'Normal';
      case 'stunted':
        return 'Stunting';
      case 'wasted':
        return 'Wasting';
      case 'severely-stunted':
        return 'Stunting Parah';
      case 'severely-wasted':
        return 'Wasting Parah';
      case 'overweight':
        return 'Kelebihan Berat Badan';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-gray-900">Dashboard Saya</h1>
          <p className="text-gray-600">
            Selamat datang, <span className="font-medium">{parentName}</span>. Pantau perkembangan kesehatan anak Anda.
          </p>
        </div>

        {/* Alert jika ada masalah */}
        {latestChild.nutritionalStatus !== 'normal' && (
          <Alert className="mb-6 border-2 border-amber-500 bg-amber-50">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-amber-900">
              <strong>Perhatian!</strong> Status gizi {latestChild.name} memerlukan perhatian khusus. 
              Silakan konsultasi dengan petugas posyandu untuk mendapatkan panduan nutrisi yang tepat.
            </AlertDescription>
          </Alert>
        )}

        {/* Child Info Cards */}
        <div className="grid gap-6 mb-8">
          {myChildren.map((child) => (
            <Card key={child.id} className="border-2 border-purple-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      <Baby className="h-6 w-6 text-purple-600" />
                      {child.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {child.age} bulan • {child.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(child.nutritionalStatus)} border`}>
                    {getStatusText(child.nutritionalStatus)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Latest Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Weight className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-900">Berat Badan</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{child.weight} kg</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-900">Tinggi Badan</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{child.height} cm</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-purple-900">Usia</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{child.age} bln</p>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-amber-900">Pemeriksaan</span>
                    </div>
                    <p className="text-sm font-bold text-amber-900">
                      {format(new Date(child.checkupDate), 'dd MMM yyyy', { locale: id })}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                {child.notes && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Catatan Petugas:</h4>
                    <p className="text-sm text-gray-700">{child.notes}</p>
                  </div>
                )}

                {/* Growth Chart */}
                {child.growthHistory && child.growthHistory.length > 0 && (
                  <div className="mt-6">
                    <GrowthChart child={child} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <TrendingUp className="h-5 w-5" />
                Tips Pemantauan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-900">
                <li className="flex items-start gap-2">
                  <div className="bg-blue-200 p-1 rounded-full mt-0.5">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                  Lakukan pemeriksaan rutin setiap bulan di posyandu
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-200 p-1 rounded-full mt-0.5">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                  Pantau kurva pertumbuhan untuk mendeteksi masalah dini
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-200 p-1 rounded-full mt-0.5">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                  Catat setiap perubahan pada kesehatan anak
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-200 p-1 rounded-full mt-0.5">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                  Konsultasi dengan petugas jika ada kekhawatiran
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Activity className="h-5 w-5" />
                Langkah Selanjutnya
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-start gap-2">
                  <div className="bg-green-200 p-1 rounded-full mt-0.5">
                    <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                  </div>
                  Pelajari panduan nutrisi yang sesuai dengan usia anak
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-200 p-1 rounded-full mt-0.5">
                    <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                  </div>
                  Berikan makanan bergizi seimbang setiap hari
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-200 p-1 rounded-full mt-0.5">
                    <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                  </div>
                  Jadwalkan pemeriksaan berikutnya di posyandu
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-200 p-1 rounded-full mt-0.5">
                    <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                  </div>
                  Pastikan anak mendapat imunisasi lengkap
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
