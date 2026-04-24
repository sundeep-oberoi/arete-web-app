import { useState, useEffect } from 'react';
import { FormProvider, useForm, STORAGE_KEY } from './context/FormContext';
import type { FormState } from './types/form';
import { isValidEmail } from './utils/validation';
import { saveLeaveEmail } from './services/api';
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
import HospitalisationPreferences from './steps/HospitalisationPreferences';
import ChoiceOfDoctors from './steps/ChoiceOfDoctors';
import ContactDetails from './steps/ContactDetails';
import Recap from './steps/Recap';
import ReviewOffer from './steps/ReviewOffer';
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
  HospitalisationPreferences,
  ChoiceOfDoctors,
  ContactDetails,
  Recap,
  ReviewOffer,
];

function FormApp() {
  const { state, save, load, reset } = useForm();
  const [resumeData, setResumeData] = useState<FormState | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Leave-and-come-back modal state
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveEmail, setLeaveEmail] = useState('');
  const [leaveEmailTouched, setLeaveEmailTouched] = useState(false);
  const [leaveSaving, setLeaveSaving] = useState(false);
  const [leaveGoodbye, setLeaveGoodbye] = useState(false);

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
    setLeaveEmail('');
    setLeaveEmailTouched(false);
    setShowLeaveModal(true);
  };

  const handleLeaveSubmit = async () => {
    setLeaveEmailTouched(true);
    if (!isValidEmail(leaveEmail)) return;
    setLeaveSaving(true);
    try {
      await saveLeaveEmail(leaveEmail, state.data);
    } catch {
      // silently continue even if API call fails
    }
    setLeaveSaving(false);
    setShowLeaveModal(false);
    setLeaveGoodbye(true);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    reset();
  };

  if (leaveGoodbye) {
    return (
      <div className="app">
        <div className="submitted-screen">
          <div className="submitted-icon">✉</div>
          <h2>We'll send you a link!</h2>
          <p>
            We've saved your progress and will send a link to <strong>{leaveEmail}</strong>. Complete
            your application at your own pace.
          </p>
          <p style={{ marginTop: '0.5rem' }}>Have a nice day!</p>
          <button onClick={() => { setLeaveGoodbye(false); reset(); }} className="btn-primary">
            Start a new quote
          </button>
        </div>
      </div>
    );
  }

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
  const leaveEmailError =
    leaveEmailTouched && !isValidEmail(leaveEmail)
      ? 'Please enter a valid email address.'
      : null;

  return (
    <div className="app">
      {/* Resume saved session modal */}
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

      {/* Leave-and-come-back modal */}
      {showLeaveModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Save &amp; come back later</h3>
            <p>
              We will send you a link to return to the form. Complete it at your own pace.
            </p>
            <div className="leave-input-wrapper">
              <input
                type="email"
                className={`input-field leave-email-input ${leaveEmailError ? 'input-field--error' : ''}`}
                value={leaveEmail}
                placeholder="your@email.com"
                onChange={(e) => setLeaveEmail(e.target.value)}
                onBlur={() => setLeaveEmailTouched(true)}
                onKeyDown={(e) => { if (e.key === 'Enter') void handleLeaveSubmit(); }}
                autoFocus
              />
              {leaveEmailError && <p className="input-error">{leaveEmailError}</p>}
            </div>
            <div className="modal-actions">
              <button
                onClick={() => void handleLeaveSubmit()}
                className="btn-primary"
                disabled={leaveSaving}
              >
                {leaveSaving ? 'Saving…' : 'Send me the link'}
              </button>
              <button onClick={() => setShowLeaveModal(false)} className="btn-secondary">
                Cancel
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
