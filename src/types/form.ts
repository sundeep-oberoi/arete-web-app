export type Profile =
  | 'employee'
  | 'self_employed'
  | 'retired'
  | 'civil_servant'
  | 'student';

export type OpticalNeed = 'nothing' | 'standard' | 'progressive' | 'surgery';
export type DentalNeed = 'none' | 'maintenance' | 'standard' | 'major';
export type AlternativeMedicineUse = 'never' | 'one_two' | 'more_than_three';

export interface FormData {
  profile: Profile | null;
  coverPartner: boolean;
  coverChildren: boolean;
  numberOfChildren: number;
  age: string;
  postcode: string;
  opticalNeeds: OpticalNeed;
  dentalNeeds: DentalNeed;
  alternativeMedicine: AlternativeMedicineUse;
}

export interface FormState {
  currentStep: number;
  data: FormData;
  savedAt: string | null;
}
