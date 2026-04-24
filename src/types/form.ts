export type Profile =
  | 'employee'
  | 'self_employed'
  | 'retired'
  | 'civil_servant'
  | 'student';

export type OpticalNeed = 'nothing' | 'standard' | 'progressive' | 'surgery';
export type DentalNeed = 'none' | 'maintenance' | 'standard' | 'major';
export type AlternativeMedicineUse = 'never' | 'one_two' | 'more_than_three';
export type HospitalisationPreference = 'shared' | 'private_preferred' | 'private_essential';
export type DoctorChoice = 'gp_specialist' | 'specialist_standard' | 'specialist_private';

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
  hospitalisationPreference: HospitalisationPreference;
  doctorChoice: DoctorChoice | null;
  email: string;
  phoneNumber: string;
}

export interface FormState {
  currentStep: number;
  data: FormData;
  savedAt: string | null;
}
