import { useState, useEffect, useRef } from 'react';
import { useForm } from '../context/FormContext';
import type { HospitalisationPreference } from '../types/form';
import { getRoomCost } from '../services/api';
import './steps.css';

const OPTIONS: { value: HospitalisationPreference; label: string; desc: string }[] = [
  { value: 'shared', label: 'A shared room suits me', desc: 'Standard coverage at lower cost' },
  {
    value: 'private_preferred',
    label: 'I prefer a private room if possible',
    desc: 'Private room coverage when available',
  },
  {
    value: 'private_essential',
    label: 'A private room is essential for me',
    desc: 'Full private room coverage guaranteed',
  },
];

export default function HospitalisationPreferences() {
  const { state, updateField } = useForm();
  const { hospitalisationPreference } = state.data;
  const [dailyRoomCost, setDailyRoomCost] = useState<number | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    getRoomCost(state.data)
      .then((res) => setDailyRoomCost(res.averageDailyRoomCost))
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="step">
      <h2 className="step-title">What are your hospitalisation preferences?</h2>
      <p className="step-subtitle">
        Choose the option that best fits your comfort needs for hospital stays.
        {dailyRoomCost != null && (
          <>
            {' '}Private rooms in your area cost on average{' '}
            <strong>€{dailyRoomCost.toFixed(2)}/day</strong>.
          </>
        )}
      </p>
      <div className="card-grid card-grid--wide">
        {OPTIONS.map(({ value, label, desc }) => (
          <button
            key={value}
            className={`option-card ${hospitalisationPreference === value ? 'option-card--selected' : ''}`}
            onClick={() => updateField({ hospitalisationPreference: value })}
            aria-pressed={hospitalisationPreference === value}
          >
            <span className="card-label">{label}</span>
            <span className="card-desc">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
