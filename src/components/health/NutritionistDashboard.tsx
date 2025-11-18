import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ChildHealthData } from '../../types/health';
import { AlertTriangle, LineChart, Salad, ListChecks } from 'lucide-react';

interface NutritionistDashboardProps {
  children: ChildHealthData[];
}

export function NutritionistDashboard({ children }: NutritionistDashboardProps) {
  const atRiskChildren = children.filter(
    (c) =>
      c.nutritionalStatus !== 'normal' &&
      c.nutritionalStatus !== 'overweight'
  );

  const normalChildren = children.filter(
    (c) => c.nutritionalStatus === 'normal' || c.nutritionalStatus === 'overweight'
  );

  const getStatusBadge = (status: ChildHealthData['nutritionalStatus']) => {
    const map: Record<string, { label: string; className: string }> = {
      normal: { label: 'Normal', className: 'bg-green-500' },
      'severely-stunted': { label: 'Stunting (Merah)', className: 'bg-red-600' },
      stunted: { label: 'Potential Stunting (Kuning)', className: 'bg-amber-500' },
      wasted: { label: 'Wasting', className: 'bg-amber-500' },
      'severely-wasted': { label: 'Wasting Parah', className: 'bg-red-600' },
      overweight: { label: 'Berat Berlebih', className: 'bg-blue-500' },
    };

    const cfg = map[status];
    return <Badge className={cfg.className}>{cfg.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-gray-900">Dashboard Ahli Gizi</h1>
          <p className="text-gray-600">
            Fokus pada balita dengan risiko stunting dan wasting untuk perencanaan intervensi gizi.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Balita Berisiko
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-amber-600 text-xl font-semibold">
                {atRiskChildren.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Stunting / Wasting / Potential Stunting
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Salad className="h-4 w-4" />
                Balita Normal / Overweight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-green-600 text-xl font-semibold">
                {normalChildren.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Tetap dipantau untuk pencegahan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                Prioritas Intervensi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">
                Fokus utama: balita dengan label merah & kuning pada tabel di bawah.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabel balita berisiko */}
        <Card>
          <CardHeader>
            <CardTitle>Balita dengan Risiko Gizi</CardTitle>
            <CardDescription>
              Daftar balita dengan stunting, wasting, atau potential stunting yang membutuhkan pemantauan dan intervensi gizi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {atRiskChildren.length === 0 ? (
              <p className="text-sm text-gray-600">
                Tidak ada balita berisiko saat ini. Pertahankan pola gizi yang baik dan pemantauan rutin.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Anak</TableHead>
                      <TableHead>Usia (bulan)</TableHead>
                      <TableHead>Orang Tua</TableHead>
                      <TableHead>Berat (kg)</TableHead>
                      <TableHead>Tinggi (cm)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tgl Periksa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {atRiskChildren.map((child) => (
                      <TableRow key={child.id}>
                        <TableCell>{child.name}</TableCell>
                        <TableCell>{child.age}</TableCell>
                        <TableCell>{child.parentName}</TableCell>
                        <TableCell>{child.weight}</TableCell>
                        <TableCell>{child.height}</TableCell>
                        <TableCell>{getStatusBadge(child.nutritionalStatus)}</TableCell>
                        <TableCell>
                          {new Date(child.checkupDate).toLocaleDateString('id-ID')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
