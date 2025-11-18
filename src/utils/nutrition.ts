// src/utils/nutrition.ts
import type { ChildHealthData } from '../types/health';
import {
  getHeightForAgeStandards,
  getWeightForAgeStandards,
  interpolateValue,
} from '../data/whoGrowthStandards';

// Kategori utama yang dipakai di ChildHealthData
export type NutritionalStatus =
  | 'normal'
  | 'stunting'             // merah
  | 'potential-stunting'   // kuning
  | 'wasted'
  | 'severely-wasted'
  | 'overweight';

interface BasicChildInfo {
  age: number;          // bulan
  height: number;       // cm
  weight: number;       // kg
  gender: 'male' | 'female';
}

// Hitung tingkat stunting berdasarkan tinggi/umur WHO
// < P3                -> stunting (merah)
// P3 – P15            -> potential-stunting (kuning)
// >= P15              -> normal
function getStuntingLevel(
  child: BasicChildInfo
): 'normal' | 'stunting' | 'potential-stunting' {
  const heightStandards = getHeightForAgeStandards(child.gender);

  const p3 = interpolateValue(child.age, heightStandards, 'p3');
  const p15 = interpolateValue(child.age, heightStandards, 'p15');

  if (child.height < p3) return 'stunting';              // merah
  if (child.height < p15) return 'potential-stunting';   // kuning
  return 'normal';
}

// Hitung wasting / underweight berdasarkan berat/umur WHO
function getWastingLevel(
  child: BasicChildInfo
): 'normal' | 'wasted' | 'severely-wasted' | 'overweight' {
  const weightStandards = getWeightForAgeStandards(child.gender);

  const p3  = interpolateValue(child.age, weightStandards, 'p3');
  const p15 = interpolateValue(child.age, weightStandards, 'p15');
  const p85 = interpolateValue(child.age, weightStandards, 'p85');
  const p97 = interpolateValue(child.age, weightStandards, 'p97');

  if (child.weight < p3)  return 'severely-wasted';
  if (child.weight < p15) return 'wasted';
  if (child.weight > p97) return 'overweight';
  if (child.weight > p85) return 'overweight';
  return 'normal';
}

// Fungsi utama: gabungkan ke satu status untuk app
export function calculateNutritionalStatusWHO(
  child: BasicChildInfo
): NutritionalStatus {
  const stunting = getStuntingLevel(child);
  const wasting  = getWastingLevel(child);

  // Prioritas: kondisi merah dulu, lalu wasting, lalu potential
  if (stunting === 'stunting')           return 'stunting';          // merah
  if (wasting === 'severely-wasted')     return 'severely-wasted';
  if (wasting === 'wasted')              return 'wasted';
  if (wasting === 'overweight')          return 'overweight';
  if (stunting === 'potential-stunting') return 'potential-stunting'; // kuning

  return 'normal';
}
