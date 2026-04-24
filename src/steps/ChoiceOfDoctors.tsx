import { useForm } from '../context/FormContext';
import type { DoctorChoice } from '../types/form';
import './steps.css';

const OPTIONS: { value: DoctorChoice; label: string; desc: string }[] = [
  {
    value: 'gp_specialist',
    label: 'GPs and occasionally a specialist',
    desc: 'Standard referrals at public rates',
  },
  {
    value: 'specialist_standard',
    label: 'Specialists at standard rates',
    desc: 'Direct access to specialists at conventional rates',
  },
  {
    value: 'specialist_private',
    label: 'Specialists, private rates',
    desc: 'Consultations at private practice rates fully covered',
  },
];

export default function ChoiceOfDoctors() {
  const { state, updateField } = useForm();
  const { doctorChoice } = state.data;

  return (
    <div className="step">
      <h2 className="step-title">What is your preference for accessing doctors?</h2>
      <div className="card-grid card-grid--wide">
        {OPTIONS.map(({ value, label, desc }) => (
          <button
            key={value}
            className={`option-card ${doctorChoice === value ? 'option-card--selected' : ''}`}
            onClick={() => updateField({ doctorChoice: value })}
            aria-pressed={doctorChoice === value}
          >
            <span className="card-label">{label}</span>
            <span className="card-desc">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
