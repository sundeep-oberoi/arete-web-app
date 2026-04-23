import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { isValidAge } from '../utils/validation';
import './steps.css';

export default function Age() {
  const { state, updateField } = useForm();
  const { age } = state.data;
  const [touched, setTouched] = useState(false);

  const validation = isValidAge(age);
  const showError = touched && age !== '' && !validation.valid;

  return (
    <div className="step">
      <h2 className="step-title">How old are you?</h2>
      <p className="step-subtitle">
        Your premium is calculated based on your actual age. We don't need your full date of birth.
      </p>
      <div className="input-wrapper">
        <input
          type="number"
          inputMode="numeric"
          className={`input-field ${showError ? 'input-field--error' : ''}`}
          value={age}
          onChange={(e) => updateField({ age: e.target.value })}
          onBlur={() => setTouched(true)}
          placeholder="e.g. 35"
          min={18}
          max={85}
          aria-label="Your age"
        />
        {showError && validation.error && (
          <p className="input-error">{validation.error}</p>
        )}
      </div>
      <div className="info-box">
        Cover is available for ages 18 to 85.
      </div>
    </div>
  );
}
