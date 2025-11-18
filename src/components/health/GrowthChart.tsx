import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { ChildHealthData } from '../../types/health';
import { getWeightForAgeStandards, getHeightForAgeStandards, interpolateValue, getZScore } from '../../data/whoGrowthStandards';
import { Badge } from '../ui/badge';
import { Info } from 'lucide-react';

interface GrowthChartProps {
  child: ChildHealthData;
}

export function GrowthChart({ child }: GrowthChartProps) {
  // Ambil standar WHO berdasarkan gender
  const weightStandards = getWeightForAgeStandards(child.gender);
  const heightStandards = getHeightForAgeStandards(child.gender);
  
  // Dapatkan rentang umur dari data anak
  const minAge = Math.min(...(child.growthHistory?.map(r => r.age) || [child.age]));
  const maxAge = Math.max(...(child.growthHistory?.map(r => r.age) || [child.age]));
  
  // Buat data chart untuk berat badan dengan kurva WHO
  const weightChartData = [];
  for (let age = Math.max(0, minAge - 3); age <= maxAge + 3; age++) {
    const dataPoint: any = {
      age,
      ageLabel: `${age} bln`,
      p3: interpolateValue(age, weightStandards, 'p3'),
      p15: interpolateValue(age, weightStandards, 'p15'),
      p50: interpolateValue(age, weightStandards, 'p50'),
      p85: interpolateValue(age, weightStandards, 'p85'),
      p97: interpolateValue(age, weightStandards, 'p97'),
    };
    
    // Tambahkan data anak jika ada di umur ini
    const childData = child.growthHistory?.find(r => r.age === age);
    if (childData) {
      dataPoint.childWeight = childData.weight;
    }
    
    weightChartData.push(dataPoint);
  }
  
  // Buat data chart untuk tinggi badan dengan kurva WHO
  const heightChartData = [];
  for (let age = Math.max(0, minAge - 3); age <= maxAge + 3; age++) {
    const dataPoint: any = {
      age,
      ageLabel: `${age} bln`,
      p3: interpolateValue(age, heightStandards, 'p3'),
      p15: interpolateValue(age, heightStandards, 'p15'),
      p50: interpolateValue(age, heightStandards, 'p50'),
      p85: interpolateValue(age, heightStandards, 'p85'),
      p97: interpolateValue(age, heightStandards, 'p97'),
    };
    
    // Tambahkan data anak jika ada di umur ini
    const childData = child.growthHistory?.find(r => r.age === age);
    if (childData) {
      dataPoint.childHeight = childData.height;
    }
    
    heightChartData.push(dataPoint);
  }
  
  // Dapatkan status berdasarkan standar WHO
  const weightStatus = getZScore(child.weight, child.age, weightStandards);
  const heightStatus = getZScore(child.height, child.age, heightStandards);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toFixed(1)} {entry.dataKey.includes('Weight') || entry.dataKey.includes('childWeight') ? 'kg' : 'cm'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Weight Chart with WHO Standards */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Kurva Pertumbuhan Berat Badan (WHO)</CardTitle>
              <CardDescription>
                Grafik perkembangan berat badan {child.name} dengan standar WHO
              </CardDescription>
            </div>
            <Badge variant={weightStatus.includes('Normal') ? 'default' : 'destructive'}>
              {weightStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={weightChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="ageLabel" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                label={{ value: 'Berat (kg)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              
              {/* Area zona normal (P15-P85) */}
              <Area
                type="monotone"
                dataKey="p85"
                fill="url(#colorNormal)"
                stroke="none"
              />
              <Area
                type="monotone"
                dataKey="p15"
                fill="white"
                stroke="none"
              />
              
              {/* Garis persentil WHO */}
              <Line 
                type="monotone" 
                dataKey="p3" 
                stroke="#ef4444" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="P3 (Batas Bawah)"
              />
              <Line 
                type="monotone" 
                dataKey="p15" 
                stroke="#f59e0b" 
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
                name="P15"
              />
              <Line 
                type="monotone" 
                dataKey="p50" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                name="P50 (Median)"
              />
              <Line 
                type="monotone" 
                dataKey="p85" 
                stroke="#f59e0b" 
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
                name="P85"
              />
              <Line 
                type="monotone" 
                dataKey="p97" 
                stroke="#ef4444" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="P97 (Batas Atas)"
              />
              
              {/* Data anak */}
              <Line 
                type="monotone" 
                dataKey="childWeight" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                name={child.name}
              />
            </ComposedChart>
          </ResponsiveContainer>
          
          <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Info className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-900">
              <span className="font-medium">Interpretasi:</span> Zona hijau (P15-P85) menunjukkan pertumbuhan normal. 
              Zona kuning (P3-P15 & P85-P97) memerlukan perhatian. 
              Di luar P3 atau P97 memerlukan intervensi medis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Height Chart with WHO Standards */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Kurva Pertumbuhan Tinggi Badan (WHO)</CardTitle>
              <CardDescription>
                Grafik perkembangan tinggi badan {child.name} dengan standar WHO
              </CardDescription>
            </div>
            <Badge variant={heightStatus.includes('Normal') ? 'default' : 'destructive'}>
              {heightStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={heightChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNormalHeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="ageLabel" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                label={{ value: 'Tinggi (cm)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              
              {/* Area zona normal (P15-P85) */}
              <Area
                type="monotone"
                dataKey="p85"
                fill="url(#colorNormalHeight)"
                stroke="none"
              />
              <Area
                type="monotone"
                dataKey="p15"
                fill="white"
                stroke="none"
              />
              
              {/* Garis persentil WHO */}
              <Line 
                type="monotone" 
                dataKey="p3" 
                stroke="#ef4444" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="P3 (Batas Bawah)"
              />
              <Line 
                type="monotone" 
                dataKey="p15" 
                stroke="#f59e0b" 
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
                name="P15"
              />
              <Line 
                type="monotone" 
                dataKey="p50" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={false}
                name="P50 (Median)"
              />
              <Line 
                type="monotone" 
                dataKey="p85" 
                stroke="#f59e0b" 
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
                name="P85"
              />
              <Line 
                type="monotone" 
                dataKey="p97" 
                stroke="#ef4444" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="P97 (Batas Atas)"
              />
              
              {/* Data anak */}
              <Line 
                type="monotone" 
                dataKey="childHeight" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                name={child.name}
              />
            </ComposedChart>
          </ResponsiveContainer>
          
          <div className="mt-4 flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
            <Info className="size-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-purple-900">
              <span className="font-medium">Catatan:</span> Tinggi badan di bawah P3 mengindikasikan kemungkinan stunting. 
              Pemantauan rutin dan intervensi nutrisi diperlukan untuk anak dengan pertumbuhan di bawah zona normal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}