import type { FormData } from '../types/form';

export function canProceed(step: number, data: FormData): boolean {
  switch (step) {
    case 0: return true;   // SituationIntro
    case 1: return data.profile !== null;   // GeneralProfile
    case 2: return true;   // Partner
    case 3: return true;   // Children
    case 4: return isValidAge(data.age).valid;   // Age
    case 5: return isValidFrenchPostcode(data.postcode);   // Postcode
    case 6: return true;   // SpecialNeedsIntro
    case 7: return true;   // OpticalNeeds
    case 8: return true;   // DentalNeeds
    case 9: return true;   // AlternativeMedicine
    case 10: return true;  // HospitalisationPreferences
    case 11: return data.doctorChoice !== null;  // ChoiceOfDoctors
    case 12: return isValidEmail(data.email) || isValidFrenchMobile(data.phoneNumber);  // ContactDetails
    case 13: return true;  // Recap
    case 14: return true;  // ReviewOffer
    default: return false;
  }
}

export function isValidFrenchPostcode(postcode: string): boolean {
  return /^(?:0[1-9]|[1-8]\d|9[0-5])\d{3}$|^97[1-6]\d{2}$/.test(postcode);
}

export function isValidAge(age: string): { valid: boolean; error?: string } {
  if (age.trim() === '') return { valid: false };
  const num = parseInt(age, 10);
  if (isNaN(num)) return { valid: false, error: 'Please enter a valid age.' };
  if (num < 18) return { valid: false, error: 'You must be at least 18 years old to apply.' };
  if (num > 85) return { valid: false, error: 'Maximum age for this policy is 85.' };
  return { valid: true };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidFrenchMobile(phone: string): boolean {
  return /^0[67]\d{8}$/.test(phone.replace(/\s/g, ''));
}
