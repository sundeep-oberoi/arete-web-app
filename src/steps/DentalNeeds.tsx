import { useForm } from '../context/FormContext';
import type { DentalNeed } from '../types/form';
import './steps.css';

const OPTIONS: { value: DentalNeed; label: string; desc: string }[] = [
  { value: 'none', label: 'No cover', desc: "I'm happy with the public scheme" },
  {
    value: 'maintenance',
    label: 'Just maintenance',
    desc: 'Scale & polish, fillings, check-ups',
  },
  {
    value: 'standard',
    label: 'Standard treatments',
    desc: 'Crowns, bridges, root canals',
  },
  {
    value: 'major',
    label: 'Major treatments',
    desc: 'Implants, braces',
  },
];

export default function DentalNeeds() {
  const { state, updateField } = useForm();
  const { dentalNeeds } = state.data;

  return (
    <div className="step">
      <h2 className="step-title">What are your dental needs?</h2>
      <p className="step-subtitle">
        You will be covered for the dental treatments that genuinely concern you — nothing more,
        nothing less.
      </p>
      <div className="card-grid card-grid--wide">
        {OPTIONS.map(({ value, label, desc }) => (
          <button
            key={value}
            className={`option-card ${dentalNeeds === value ? 'option-card--selected' : ''}`}
            onClick={() => updateField({ dentalNeeds: value })}
            aria-pressed={dentalNeeds === value}
          >
            <span className="card-label">{label}</span>
            <span className="card-desc">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
