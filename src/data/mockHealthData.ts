import { ChildHealthData, NutritionalGuideline } from '../types/health';

// Data awal dikosongkan untuk demonstrasi
export const childrenHealthData: ChildHealthData[] = [];

export const nutritionalGuidelines: NutritionalGuideline[] = [
  {
    id: '1',
    title: 'Makanan Kaya Protein',
    description: 'Penting untuk pertumbuhan dan perkembangan otot. Sertakan protein dalam setiap makan.',
    ageGroup: '6-36 bulan',
    foods: ['Telur', 'Ikan', 'Ayam', 'Kacang-kacangan', 'Lentil', 'Produk susu', 'Tahu'],
    icon: 'Egg'
  },
  {
    id: '2',
    title: 'Makanan Kaya Zat Besi',
    description: 'Mencegah anemia dan mendukung perkembangan otak.',
    ageGroup: 'Semua usia',
    foods: ['Bayam', 'Daging merah', 'Sereal yang diperkaya', 'Kacang-kacangan', 'Buah kering', 'Hati'],
    icon: 'Apple'
  },
  {
    id: '3',
    title: 'Kalsium & Vitamin D',
    description: 'Penting untuk pertumbuhan tulang dan mencegah stunting.',
    ageGroup: 'Semua usia',
    foods: ['Susu', 'Keju', 'Yogurt', 'Susu nabati yang diperkaya', 'Salmon', 'Kuning telur'],
    icon: 'Milk'
  },
  {
    id: '4',
    title: 'Buah & Sayuran',
    description: 'Menyediakan vitamin, mineral, dan serat yang penting.',
    ageGroup: 'Semua usia',
    foods: ['Wortel', 'Ubi jalar', 'Pisang', 'Jeruk', 'Berry', 'Brokoli', 'Labu'],
    icon: 'Carrot'
  },
  {
    id: '5',
    title: 'Biji-bijian Utuh',
    description: 'Memberikan energi dan nutrisi penting untuk pertumbuhan aktif.',
    ageGroup: '6+ bulan',
    foods: ['Beras merah', 'Oatmeal', 'Roti gandum utuh', 'Quinoa', 'Millet'],
    icon: 'Wheat'
  },
  {
    id: '6',
    title: 'Lemak Sehat',
    description: 'Mendukung perkembangan otak dan penyerapan nutrisi.',
    ageGroup: '6+ bulan',
    foods: ['Alpukat', 'Kacang-kacangan', 'Minyak zaitun', 'Ikan berlemak', 'Selai kacang'],
    icon: 'Droplet'
  }
];

export const stuntingPrevention = {
  earlyInterventions: [
    'ASI eksklusif selama 6 bulan pertama',
    'Perkenalkan makanan pendamping pada usia 6 bulan',
    'Berikan makanan beragam dan kaya nutrisi',
    'Pastikan asupan protein dan mikronutrien yang cukup',
    'Pemeriksaan kesehatan dan pemantauan pertumbuhan secara rutin'
  ],
  warningSign: [
    'Anak tidak bertambah berat badan secara konsisten',
    'Tinggi badan tidak bertambah sesuai harapan',
    'Keterlambatan pencapaian milestone perkembangan',
    'Sering sakit',
    'Nafsu makan buruk atau kesulitan makan'
  ],
  feedingSchedule: {
    '6-8 bulan': '2-3 kali makan per hari plus ASI',
    '9-11 bulan': '3-4 kali makan per hari plus 1-2 camilan',
    '12-24 bulan': '3-4 kali makan per hari plus 1-2 camilan',
    '24+ bulan': '3 kali makan per hari plus 2 camilan sehat'
  }
};