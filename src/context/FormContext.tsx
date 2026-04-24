import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { FormData, FormState } from '../types/form';

export const STORAGE_KEY = 'arete_form_state';

const DEFAULT_DATA: FormData = {
  profile: null,
  coverPartner: false,
  coverChildren: false,
  numberOfChildren: 0,
  age: '',
  postcode: '',
  opticalNeeds: 'nothing',
  dentalNeeds: 'none',
  alternativeMedicine: 'never',
  hospitalisationPreference: 'shared',
  doctorChoice: null,
  email: '',
  phoneNumber: '',
};

export const DEFAULT_STATE: FormState = {
  currentStep: 0,
  data: DEFAULT_DATA,
  savedAt: null,
};

type Action =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_FIELD'; payload: Partial<FormData> }
  | { type: 'SAVE' }
  | { type: 'LOAD'; payload: FormState }
  | { type: 'RESET' };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, currentStep: Math.min(state.currentStep + 1, 12) };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
    case 'UPDATE_FIELD':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'SAVE': {
      const saved = { ...state, savedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      return saved;
    }
    case 'LOAD':
      return action.payload;
    case 'RESET':
      localStorage.removeItem(STORAGE_KEY);
      return DEFAULT_STATE;
  }
}

interface FormContextValue {
  state: FormState;
  nextStep: () => void;
  prevStep: () => void;
  updateField: (data: Partial<FormData>) => void;
  save: () => void;
  load: (state: FormState) => void;
  reset: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <FormContext.Provider
      value={{
        state,
        nextStep: () => dispatch({ type: 'NEXT_STEP' }),
        prevStep: () => dispatch({ type: 'PREV_STEP' }),
        updateField: (data) => dispatch({ type: 'UPDATE_FIELD', payload: data }),
        save: () => dispatch({ type: 'SAVE' }),
        load: (s) => dispatch({ type: 'LOAD', payload: s }),
        reset: () => dispatch({ type: 'RESET' }),
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used within FormProvider');
  return ctx;
}
