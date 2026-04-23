import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { isValidFrenchPostcode } from '../utils/validation';
import './steps.css';

export default function Postcode() {
  const { state, updateField } = useForm();
  const { postcode } = state.data;
  const [touched, setTouched] = useState(false);

  const isValid = isValidFrenchPostcode(postcode);
  const showError = touched && postcode !== '' && !isValid;

  return (
    <div className="step">
      <h2 className="step-title">What is your postcode?</h2>
      <p className="step-subtitle">
        Our offer is priced according to your geographic zone to reflect local healthcare costs.
      </p>
      <div className="input-wrapper">
        <input
          type="text"
          inputMode="numeric"
          className={`input-field ${showError ? 'input-field--error' : ''}`}
          value={postcode}
          onChange={(e) => updateField({ postcode: e.target.value.replace(/\D/g, '').slice(0, 5) })}
          onBlur={() => setTouched(true)}
          placeholder="e.g. 75001"
          maxLength={5}
          aria-label="French postcode"
        />
        {showError && (
          <p className="input-error">Please enter a valid French postcode.</p>
        )}
      </div>
      <div className="info-box">
        Enter your 5-digit French postcode (e.g. 75001 for Paris).
      </div>
    </div>
  );
}
