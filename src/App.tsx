import { useState, useEffect } from 'react';
import { FormProvider, useForm, STORAGE_KEY } from './context/FormContext';
import type { FormState } from './types/form';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import GeneralProfile from './steps/GeneralProfile';
import Partner from './steps/Partner';
import Children from './steps/Children';
import Age from './steps/Age';
import Postcode from './steps/Postcode';
import OpticalNeeds from './steps/OpticalNeeds';
import DentalNeeds from './steps/DentalNeeds';
import AlternativeMedicine from './steps/AlternativeMedicine';
import Recap from './steps/Recap';
import './App.css';

const STEP_COMPONENTS = [
  GeneralProfile,
  Partner,
  Children,
  Age,
  Postcode,
  OpticalNeeds,
  DentalNeeds,
  AlternativeMedicine,
  Recap,
];

function FormApp() {
  const { state, save, load, reset } = useForm();
  const [resumeData, setResumeData] = useState<FormState | null>(null);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setResumeData(JSON.parse(raw) as FormState);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const handleResume = () => {
    if (resumeData) load(resumeData);
    setResumeData(null);
  };

  const handleStartOver = () => {
    reset();
    setResumeData(null);
  };

  const handleSaveAndLeave = () => {
    save();
    setSaveConfirmed(true);
    setTimeout(() => setSaveConfirmed(false), 4000);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="app">
        <div className="submitted-screen">
          <div className="submitted-icon">✓</div>
          <h2>Thank you!</h2>
          <p>Your information has been submitted. We'll be in touch shortly.</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            Start a new quote
          </button>
        </div>
      </div>
    );
  }

  const StepComponent = STEP_COMPONENTS[state.currentStep];

  return (
    <div className="app">
      {resumeData && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Welcome back!</h3>
            <p>
              You have a saved session from{' '}
              {new Date(resumeData.savedAt!).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              .
            </p>
            <div className="modal-actions">
              <button onClick={handleResume} className="btn-primary">
                Resume
              </button>
              <button onClick={handleStartOver} className="btn-secondary">
                Start over
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="app-header">
        <div className="app-logo">arète</div>
        <button onClick={handleSaveAndLeave} className="btn-save">
          Save &amp; return later
        </button>
      </header>

      {saveConfirmed && (
        <div className="save-toast">
          Your progress has been saved — you can safely close this page and return later.
        </div>
      )}

      <main className="app-main">
        <ProgressBar currentStep={state.currentStep} />
        <div className="step-container">
          <StepComponent />
        </div>
        <Navigation onSubmit={handleSubmit} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FormProvider>
      <FormApp />
    </FormProvider>
  );
}
