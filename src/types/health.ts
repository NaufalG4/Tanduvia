export interface ChildHealthData {
  id: string;
  name: string;
  age: number; // in months
  gender: 'male' | 'female';
  weight: number; // in kg
  height: number; // in cm
  checkupDate: string;
  nutritionalStatus: 'normal' | 'stunted' | 'wasted' | 'overweight' | 'severely-stunted' | 'severely-wasted';
  parentName: string;
  notes?: string;
  growthHistory?: GrowthRecord[];
}

export interface GrowthRecord {
  age: number; // in months
  weight: number; // in kg
  height: number; // in cm
  date: string;
}

export interface NutritionalGuideline {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  foods: string[];
  icon: string;
}