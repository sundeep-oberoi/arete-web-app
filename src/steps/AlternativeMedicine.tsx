import { useForm } from '../context/FormContext';
import type { AlternativeMedicineUse } from '../types/form';
import './steps.css';

const OPTIONS: { value: AlternativeMedicineUse; label: string }[] = [
  { value: 'never', label: 'Never or almost never' },
  { value: 'one_two', label: '1 to 2 times a year' },
  { value: 'more_than_three', label: 'More than 3 times a year' },
];

export default function AlternativeMedicine() {
  const { state, updateField } = useForm();
  const { alternativeMedicine } = state.data;

  return (
    <div className="step">
      <h2 className="step-title">How often do you use alternative medicine?</h2>
      <p className="step-subtitle">
        This helps us provide coverage adapted to your actual use of complementary therapies such as
        osteopathy, acupuncture, or homeopathy.
      </p>
      <div className="card-grid">
        {OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            className={`option-card ${alternativeMedicine === value ? 'option-card--selected' : ''}`}
            onClick={() => updateField({ alternativeMedicine: value })}
            aria-pressed={alternativeMedicine === value}
          >
            <span className="card-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
