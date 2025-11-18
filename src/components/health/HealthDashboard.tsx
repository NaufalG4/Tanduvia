import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { ChildHealthData } from '../../types/health';
import { NutritionalStatusAlert } from './NutritionalStatusAlert';
import { GrowthChart } from './GrowthChart';
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Calendar,
  LineChart,
  ClipboardPlus,
  Baby,
} from 'lucide-react';

interface HealthDashboardProps {
  children: ChildHealthData[];
  onStartInput: () => void;
}

export function HealthDashboard({
  children,
  onStartInput,
}: HealthDashboardProps) {
  const [selectedChild, setSelectedChild] =
    useState<ChildHealthData | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  // Detail SELALU buka popup
  const handleViewDetails = (child: ChildHealthData) => {
    setSelectedChild(child);
    setAlertOpen(true);
  };

  // Tombol grafik: buka dialog grafik
  const handleViewChart = (child: ChildHealthData) => {
    setSelectedChild(child);
    setChartOpen(true);
  };

  const getStatusBadge = (status: ChildHealthData['nutritionalStatus']) => {
    const variants = {
      normal: {
        label: 'Normal',
        className: 'bg-green-500',
      },
      'potential-stunting': {
        label: 'Potential Stunting',
        className: 'bg-amber-500',
      },
      stunting: {
        label: 'Stunting',
        className: 'bg-red-600',
      },
      wasted: {
        label: 'Wasting',
        className: 'bg-amber-500',
      },
      'severely-wasted': {
        label: 'Wasting Parah',
        className: 'bg-red-600',
      },
      overweight: {
        label: 'Berat Berlebih',
        className: 'bg-blue-500',
      },
    } as const;

    const config = variants[status];
    if (!config) return null;

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const totalChildren = children.length;
  const atRisk = children.filter(
    (c) => c.nutritionalStatus !== 'normal' && c.nutritionalStatus !== 'overweight'
  ).length;
  const normal = children.filter(
    (c) =>
      c.nutritionalStatus === 'normal' ||
      c.nutritionalStatus === 'overweight'
  ).length;

  // Empty state jika belum ada data
  if (totalChildren === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-gray-900">
              Dashboard Pemeriksaan Kesehatan
            </h1>
            <p className="text-gray-600">
              Pantau dan lacak status gizi serta perkembangan pertumbuhan anak
            </p>
          </div>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-6 rounded-2xl">
                  <Baby className="h-16 w-16 text-blue-600" />
                </div>
              </div>
              <h3 className="mb-2 text-gray-900">Belum Ada Data Pemeriksaan</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Mulai input data pemeriksaan kesehatan anak untuk melihat
                dashboard lengkap dengan statistik dan kurva pertumbuhan WHO.
              </p>
              <div className="flex justify-center">
                <Button className="gap-2" onClick={onStartInput}>
                  <ClipboardPlus className="h-4 w-4" />
                  Mulai Input Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">Status Normal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-800">
                  Anak dengan pertumbuhan berat dan tinggi badan sesuai standar
                  WHO untuk usianya.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">
                  Perlu Perhatian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-800">
                  Anak dengan potential stunting atau wasting yang memerlukan
                  pemantauan dan penyesuaian nutrisi.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-900">Kondisi Serius</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-800">
                  Anak dengan stunting atau wasting berat yang memerlukan
                  penanganan segera oleh tenaga kesehatan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-gray-900">
            Dashboard Pemeriksaan Kesehatan
          </h1>
          <p className="text-gray-600">
            Pantau dan lacak status gizi serta perkembangan pertumbuhan anak
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Anak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{totalChildren}</div>
              <p className="text-xs text-gray-500 mt-1">Terdaftar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Status Normal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-green-600">{normal}</div>
              <p className="text-xs text-gray-500 mt-1">
                {((normal / totalChildren) * 100).toFixed(0)}% dari total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Perlu Perhatian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-amber-600">{atRisk}</div>
              <p className="text-xs text-gray-500 mt-1">Butuh intervensi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Terakhir Diperbarui
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">10 Nov</div>
              <p className="text-xs text-gray-500 mt-1">2025</p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Banner */}
        {atRisk > 0 && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-amber-900">
                    <strong>{atRisk}</strong> anak memerlukan perhatian gizi
                    segera. Silakan tinjau kasus di bawah dan ambil tindakan
                    yang tepat.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Children Health Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Data Kesehatan Anak</CardTitle>
            <CardDescription>
              Daftar lengkap hasil pemeriksaan kesehatan dan penilaian gizi
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
              {children.map((child) => (
                <Card key={child.id} className="border">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-gray-900">{child.name}</h3>
                          <p className="text-sm text-gray-500">
                            {child.age} bulan
                          </p>
                        </div>
                        {getStatusBadge(child.nutritionalStatus)}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">Berat Badan</p>
                          <p className="text-gray-900">{child.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Tinggi Badan</p>
                          <p className="text-gray-900">{child.height} cm</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Orang Tua</p>
                          <p className="text-gray-900">{child.parentName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Pemeriksaan</p>
                          <p className="text-gray-900">
                            {new Date(
                              child.checkupDate
                            ).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleViewDetails(child)}
                          className="flex-1"
                          variant={
                            child.nutritionalStatus !== 'normal'
                              ? 'destructive'
                              : 'outline'
                          }
                        >
                          Detail
                        </Button>
                        <Button
                          onClick={() => handleViewChart(child)}
                          variant="outline"
                          size="icon"
                        >
                          <LineChart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Anak</TableHead>
                    <TableHead>Usia (bulan)</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Berat (kg)</TableHead>
                    <TableHead>Tinggi (cm)</TableHead>
                    <TableHead>Status Gizi</TableHead>
                    <TableHead>Orang Tua/Wali</TableHead>
                    <TableHead>Tanggal Periksa</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {children.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell>{child.name}</TableCell>
                      <TableCell>{child.age}</TableCell>
                      <TableCell className="capitalize">
                        {child.gender === 'male'
                          ? 'Laki-laki'
                          : 'Perempuan'}
                      </TableCell>
                      <TableCell>{child.weight}</TableCell>
                      <TableCell>{child.height}</TableCell>
                      <TableCell>
                        {getStatusBadge(child.nutritionalStatus)}
                      </TableCell>
                      <TableCell>{child.parentName}</TableCell>
                      <TableCell>
                        {new Date(
                          child.checkupDate
                        ).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleViewDetails(child)}
                            size="sm"
                            variant={
                              child.nutritionalStatus !== 'normal'
                                ? 'destructive'
                                : 'outline'
                            }
                          >
                            Detail
                          </Button>
                          <Button
                            onClick={() => handleViewChart(child)}
                            size="sm"
                            variant="outline"
                          >
                            <LineChart className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nutritional Status Alert Dialog */}
      <NutritionalStatusAlert
        child={selectedChild}
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      />

      {/* Growth Chart Dialog */}
      <Dialog open={chartOpen} onOpenChange={setChartOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Grafik Pertumbuhan - {selectedChild?.name}
            </DialogTitle>
            <DialogDescription>
              Grafik ini menunjukkan perkembangan pertumbuhan anak dari waktu ke
              waktu.
            </DialogDescription>
          </DialogHeader>
          {selectedChild &&
            (selectedChild.growthHistory &&
            selectedChild.growthHistory.length > 0 ? (
              <GrowthChart child={selectedChild} />
            ) : (
              <p className="text-sm text-gray-600">
                Belum ada riwayat pertumbuhan yang dapat ditampilkan sebagai
                grafik.
              </p>
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}