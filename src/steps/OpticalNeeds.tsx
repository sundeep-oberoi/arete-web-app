import { useForm } from '../context/FormContext';
import type { OpticalNeed } from '../types/form';
import './steps.css';

const OPTIONS: { value: OpticalNeed; label: string }[] = [
  { value: 'nothing', label: 'Nothing at all' },
  { value: 'standard', label: 'Standard glasses or contact lenses' },
  { value: 'progressive', label: 'Progressive lenses' },
  { value: 'surgery', label: "I'm planning eye surgery" },
];

export default function OpticalNeeds() {
  const { state, updateField } = useForm();
  const { opticalNeeds } = state.data;

  return (
    <div className="step">
      <div className="phase-intro">
        <h3>Let's find the offer that's right for you</h3>
        <p>A few questions about your health needs to recommend the best solution for you.</p>
      </div>
      <h2 className="step-title">What are your optical needs?</h2>
      <p className="step-subtitle">
        The optical benefits offered will match your actual usage so you only pay for what you need.
      </p>
      <div className="card-grid">
        {OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            className={`option-card ${opticalNeeds === value ? 'option-card--selected' : ''}`}
            onClick={() => updateField({ opticalNeeds: value })}
            aria-pressed={opticalNeeds === value}
          >
            <span className="card-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
