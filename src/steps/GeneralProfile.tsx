import { useForm } from '../context/FormContext';
import type { Profile } from '../types/form';
import './steps.css';

const PROFILES: { value: Profile; label: string }[] = [
  { value: 'employee', label: 'Employee' },
  { value: 'self_employed', label: 'Self-employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'civil_servant', label: 'Civil servant' },
  { value: 'student', label: 'Student' },
];

export default function GeneralProfile() {
  const { state, updateField } = useForm();
  const { profile } = state.data;

  return (
    <div className="step">
      <h2 className="step-title">Select your profile</h2>
      <p className="step-subtitle">
        Your professional situation helps us determine the right coverage options for you.
      </p>
      <div className="card-grid">
        {PROFILES.map(({ value, label }) => (
          <button
            key={value}
            className={`option-card ${profile === value ? 'option-card--selected' : ''}`}
            onClick={() => updateField({ profile: value })}
            aria-pressed={profile === value}
          >
            <span className="card-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
