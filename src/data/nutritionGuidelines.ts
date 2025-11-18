// src/data/nutritionGuidelines.ts
import { NutritionalGuideline } from '../types/health';

export const nutritionGuidelines: NutritionalGuideline[] = [
  {
    id: 'gizi-0-6',
    title: '0–6 Bulan: ASI Eksklusif',
    description:
      'Berikan ASI eksklusif tanpa tambahan makanan atau minuman lain. Pastikan frekuensi menyusui cukup dan posisi pelekatan benar.',
    ageGroup: '0-6 bulan',
    foods: ['ASI eksklusif', 'Tidak ada susu formula tanpa indikasi', 'Tidak ada MPASI'],
    icon: 'baby-bottle',
  },
  {
    id: 'gizi-6-12',
    title: '6–12 Bulan: MPASI Bertahap',
    description:
      'Mulai berikan MPASI dengan tekstur bertahap dari lumat ke cincang halus, sambil tetap melanjutkan ASI.',
    ageGroup: '6-12 bulan',
    foods: ['Bubur lembut', 'Sayur lumat', 'Buah lumat', 'Sumber protein hewani'],
    icon: 'bowl',
  },
  {
    id: 'gizi-12-24',
    title: '12–24 Bulan: Makanan Keluarga',
    description:
      'Anak mulai bisa ikut makanan keluarga, tetapi tetap perhatikan tekstur, porsi, dan variasi gizi.',
    ageGroup: '12-24 bulan',
    foods: ['Nasi lembek / tim', 'Lauk hewani', 'Sayur dan buah', 'Camilan sehat'],
    icon: 'plate',
  },
  {
    id: 'gizi-risk',
    title: 'Balita Berisiko Stunting / Wasting',
    description:
      'Berikan makanan dengan kepadatan energi tinggi, lebih sering, dan konsultasikan suplementasi sesuai anjuran tenaga kesehatan.',
    ageGroup: 'Berisiko stunting/wasting',
    foods: ['Telur', 'Ikan', 'Daging', 'Susu / produk olahan', 'Buah tinggi vitamin C'],
    icon: 'alert',
  },
];
