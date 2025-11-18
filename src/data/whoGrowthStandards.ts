// WHO Growth Standards untuk anak 0-60 bulan
// Data disederhanakan berdasarkan standar WHO

export interface WHOStandard {
  age: number; // dalam bulan
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}

// Weight-for-Age Standards (kg) - Laki-laki
export const weightForAgeBoys: WHOStandard[] = [
  { age: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
  { age: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8 },
  { age: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1 },
  { age: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0 },
  { age: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7 },
  { age: 5, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3 },
  { age: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8 },
  { age: 7, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.2, p97: 10.3 },
  { age: 8, p3: 6.9, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.7 },
  { age: 9, p3: 7.1, p15: 8.0, p50: 8.9, p85: 9.9, p97: 11.0 },
  { age: 10, p3: 7.4, p15: 8.2, p50: 9.2, p85: 10.2, p97: 11.4 },
  { age: 11, p3: 7.6, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.7 },
  { age: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0 },
  { age: 15, p3: 8.3, p15: 9.2, p50: 10.3, p85: 11.5, p97: 12.8 },
  { age: 18, p3: 8.8, p15: 9.8, p50: 10.9, p85: 12.2, p97: 13.7 },
  { age: 21, p3: 9.2, p15: 10.3, p50: 11.5, p85: 12.8, p97: 14.3 },
  { age: 24, p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.3 },
  { age: 27, p3: 10.1, p15: 11.3, p50: 12.6, p85: 14.1, p97: 15.9 },
  { age: 30, p3: 10.5, p15: 11.7, p50: 13.1, p85: 14.6, p97: 16.4 },
  { age: 33, p3: 10.8, p15: 12.1, p50: 13.5, p85: 15.1, p97: 17.0 },
  { age: 36, p3: 11.2, p15: 12.5, p50: 14.0, p85: 15.6, p97: 17.5 },
  { age: 42, p3: 12.0, p15: 13.4, p50: 15.0, p85: 16.7, p97: 18.8 },
  { age: 48, p3: 12.7, p15: 14.2, p50: 15.9, p85: 17.8, p97: 20.0 },
  { age: 54, p3: 13.5, p15: 15.1, p50: 16.9, p85: 18.9, p97: 21.2 },
  { age: 60, p3: 14.3, p15: 16.0, p50: 17.9, p85: 20.0, p97: 22.4 },
];

// Weight-for-Age Standards (kg) - Perempuan
export const weightForAgeGirls: WHOStandard[] = [
  { age: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
  { age: 1, p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.5 },
  { age: 2, p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.6 },
  { age: 3, p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.5 },
  { age: 4, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.2 },
  { age: 5, p3: 5.4, p15: 6.1, p50: 6.9, p85: 7.8, p97: 8.8 },
  { age: 6, p3: 5.7, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3 },
  { age: 7, p3: 6.0, p15: 6.8, p50: 7.6, p85: 8.6, p97: 9.8 },
  { age: 8, p3: 6.3, p15: 7.0, p50: 7.9, p85: 9.0, p97: 10.2 },
  { age: 9, p3: 6.5, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.5 },
  { age: 10, p3: 6.7, p15: 7.5, p50: 8.5, p85: 9.6, p97: 10.9 },
  { age: 11, p3: 6.9, p15: 7.7, p50: 8.7, p85: 9.9, p97: 11.2 },
  { age: 12, p3: 7.0, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.5 },
  { age: 15, p3: 7.6, p15: 8.5, p50: 9.6, p85: 10.9, p97: 12.4 },
  { age: 18, p3: 8.1, p15: 9.1, p50: 10.2, p85: 11.6, p97: 13.2 },
  { age: 21, p3: 8.6, p15: 9.6, p50: 10.9, p85: 12.4, p97: 14.1 },
  { age: 24, p3: 9.0, p15: 10.2, p50: 11.5, p85: 13.0, p97: 14.8 },
  { age: 27, p3: 9.4, p15: 10.6, p50: 12.0, p85: 13.6, p97: 15.4 },
  { age: 30, p3: 9.8, p15: 11.1, p50: 12.5, p85: 14.1, p97: 16.0 },
  { age: 33, p3: 10.2, p15: 11.5, p50: 13.0, p85: 14.7, p97: 16.6 },
  { age: 36, p3: 10.5, p15: 11.9, p50: 13.5, p85: 15.2, p97: 17.2 },
  { age: 42, p3: 11.3, p15: 12.8, p50: 14.4, p85: 16.3, p97: 18.5 },
  { age: 48, p3: 12.1, p15: 13.7, p50: 15.4, p85: 17.4, p97: 19.8 },
  { age: 54, p3: 12.9, p15: 14.6, p50: 16.4, p85: 18.5, p97: 21.0 },
  { age: 60, p3: 13.7, p15: 15.5, p50: 17.4, p85: 19.7, p97: 22.3 },
];

// Height-for-Age Standards (cm) - Laki-laki
export const heightForAgeBoys: WHOStandard[] = [
  { age: 0, p3: 46.1, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.7 },
  { age: 1, p3: 50.8, p15: 52.8, p50: 54.7, p85: 56.7, p97: 58.6 },
  { age: 2, p3: 54.4, p15: 56.4, p50: 58.4, p85: 60.4, p97: 62.4 },
  { age: 3, p3: 57.3, p15: 59.4, p50: 61.4, p85: 63.5, p97: 65.5 },
  { age: 4, p3: 59.7, p15: 61.8, p50: 63.9, p85: 66.0, p97: 68.0 },
  { age: 5, p3: 61.7, p15: 63.8, p50: 65.9, p85: 68.0, p97: 70.1 },
  { age: 6, p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 71.9 },
  { age: 7, p3: 64.8, p15: 67.0, p50: 69.2, p85: 71.3, p97: 73.5 },
  { age: 8, p3: 66.2, p15: 68.4, p50: 70.6, p85: 72.8, p97: 75.0 },
  { age: 9, p3: 67.5, p15: 69.7, p50: 72.0, p85: 74.2, p97: 76.5 },
  { age: 10, p3: 68.7, p15: 71.0, p50: 73.3, p85: 75.6, p97: 77.9 },
  { age: 11, p3: 69.9, p15: 72.2, p50: 74.5, p85: 76.9, p97: 79.2 },
  { age: 12, p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5 },
  { age: 15, p3: 74.1, p15: 76.6, p50: 79.1, p85: 81.7, p97: 84.2 },
  { age: 18, p3: 76.9, p15: 79.6, p50: 82.3, p85: 85.0, p97: 87.7 },
  { age: 21, p3: 79.6, p15: 82.3, p50: 85.1, p85: 88.0, p97: 90.9 },
  { age: 24, p3: 81.7, p15: 84.8, p50: 87.8, p85: 90.9, p97: 93.9 },
  { age: 27, p3: 83.5, p15: 86.7, p50: 90.0, p85: 93.2, p97: 96.4 },
  { age: 30, p3: 85.1, p15: 88.3, p50: 91.9, p85: 95.3, p97: 98.7 },
  { age: 33, p3: 86.6, p15: 90.0, p50: 93.6, p85: 97.2, p97: 100.8 },
  { age: 36, p3: 88.0, p15: 91.4, p50: 95.2, p85: 99.0, p97: 102.7 },
  { age: 42, p3: 90.7, p15: 94.4, p50: 98.3, p85: 102.3, p97: 106.2 },
  { age: 48, p3: 93.2, p15: 97.1, p50: 101.2, p85: 105.3, p97: 109.4 },
  { age: 54, p3: 95.6, p15: 99.7, p50: 103.9, p85: 108.2, p97: 112.5 },
  { age: 60, p3: 97.9, p15: 102.1, p50: 106.5, p85: 110.9, p97: 115.4 },
];

// Height-for-Age Standards (cm) - Perempuan
export const heightForAgeGirls: WHOStandard[] = [
  { age: 0, p3: 45.4, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.9 },
  { age: 1, p3: 49.8, p15: 51.7, p50: 53.7, p85: 55.6, p97: 57.6 },
  { age: 2, p3: 53.0, p15: 55.0, p50: 57.1, p85: 59.1, p97: 61.1 },
  { age: 3, p3: 55.6, p15: 57.7, p50: 59.8, p85: 61.9, p97: 64.0 },
  { age: 4, p3: 57.8, p15: 59.9, p50: 62.1, p85: 64.3, p97: 66.4 },
  { age: 5, p3: 59.6, p15: 61.8, p50: 64.0, p85: 66.2, p97: 68.5 },
  { age: 6, p3: 61.2, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.3 },
  { age: 7, p3: 62.7, p15: 65.0, p50: 67.3, p85: 69.6, p97: 71.9 },
  { age: 8, p3: 64.0, p15: 66.4, p50: 68.7, p85: 71.1, p97: 73.5 },
  { age: 9, p3: 65.3, p15: 67.7, p50: 70.1, p85: 72.6, p97: 75.0 },
  { age: 10, p3: 66.5, p15: 69.0, p50: 71.5, p85: 74.0, p97: 76.4 },
  { age: 11, p3: 67.7, p15: 70.3, p50: 72.8, p85: 75.3, p97: 77.8 },
  { age: 12, p3: 68.9, p15: 71.4, p50: 74.0, p85: 76.6, p97: 79.2 },
  { age: 15, p3: 71.8, p15: 74.5, p50: 77.1, p85: 79.8, p97: 82.5 },
  { age: 18, p3: 74.5, p15: 77.2, p50: 80.0, p85: 82.9, p97: 85.7 },
  { age: 21, p3: 77.1, p15: 79.9, p50: 82.9, p85: 85.9, p97: 88.9 },
  { age: 24, p3: 79.3, p15: 82.3, p50: 85.5, p85: 88.7, p97: 91.9 },
  { age: 27, p3: 81.3, p15: 84.4, p50: 87.8, p85: 91.2, p97: 94.5 },
  { age: 30, p3: 83.1, p15: 86.4, p50: 89.9, p85: 93.4, p97: 96.9 },
  { age: 33, p3: 84.8, p15: 88.2, p50: 91.9, p85: 95.6, p97: 99.2 },
  { age: 36, p3: 86.4, p15: 89.8, p50: 93.8, p85: 97.6, p97: 101.4 },
  { age: 42, p3: 89.3, p15: 92.9, p50: 96.9, p85: 100.9, p97: 104.9 },
  { age: 48, p3: 92.0, p15: 95.7, p50: 99.7, p85: 103.9, p97: 108.1 },
  { age: 54, p3: 94.4, p15: 98.4, p50: 102.4, p85: 106.6, p97: 110.8 },
  { age: 60, p3: 96.7, p15: 100.7, p50: 105.0, p85: 109.4, p97: 113.8 },
];

// Helper function untuk interpolasi linear
export function interpolateValue(age: number, data: WHOStandard[], key: keyof Omit<WHOStandard, 'age'>): number {
  // Cari dua titik terdekat
  let lower = data[0];
  let upper = data[data.length - 1];
  
  for (let i = 0; i < data.length - 1; i++) {
    if (age >= data[i].age && age <= data[i + 1].age) {
      lower = data[i];
      upper = data[i + 1];
      break;
    }
  }
  
  // Interpolasi linear
  if (lower.age === upper.age) {
    return lower[key];
  }
  
  const ratio = (age - lower.age) / (upper.age - lower.age);
  return lower[key] + ratio * (upper[key] - lower[key]);
}

// Helper function untuk mendapatkan standar berdasarkan gender
export function getWeightForAgeStandards(gender: 'male' | 'female'): WHOStandard[] {
  return gender === 'male' ? weightForAgeBoys : weightForAgeGirls;
}

export function getHeightForAgeStandards(gender: 'male' | 'female'): WHOStandard[] {
  return gender === 'male' ? heightForAgeBoys : heightForAgeGirls;
}

// Helper function untuk mendapatkan z-score approximation
export function getZScore(value: number, age: number, data: WHOStandard[]): string {
  const p3 = interpolateValue(age, data, 'p3');
  const p15 = interpolateValue(age, data, 'p15');
  const p50 = interpolateValue(age, data, 'p50');
  const p85 = interpolateValue(age, data, 'p85');
  const p97 = interpolateValue(age, data, 'p97');
  
  if (value < p3) return 'Sangat Rendah (< P3)';
  if (value < p15) return 'Rendah (P3-P15)';
  if (value < p85) return 'Normal (P15-P85)';
  if (value < p97) return 'Tinggi (P85-P97)';
  return 'Sangat Tinggi (> P97)';
}
