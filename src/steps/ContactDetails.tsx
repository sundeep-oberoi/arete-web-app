import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { isValidEmail, isValidFrenchMobile } from '../utils/validation';
import './steps.css';
import './ContactDetails.css';

export default function ContactDetails() {
  const { state, updateField } = useForm();
  const { email, phoneNumber } = state.data;
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const emailError =
    emailTouched && email.length > 0 && !isValidEmail(email)
      ? 'Please enter a valid email address.'
      : null;
  const phoneError =
    phoneTouched && phoneNumber.length > 0 && !isValidFrenchMobile(phoneNumber)
      ? 'Please enter a valid French mobile number starting with 06 or 07.'
      : null;

  return (
    <div className="step">
      <h2 className="step-title">Just one more step before your offer</h2>
      <p className="step-subtitle">
        Last piece of information before we present the coverage most suited to your profile.
      </p>

      <div className="contact-form">
        <div className="contact-field">
          <label className="contact-label" htmlFor="contact-email">
            Email address
          </label>
          <input
            id="contact-email"
            type="email"
            className={`input-field contact-input ${emailError ? 'input-field--error' : ''}`}
            value={email}
            placeholder="name@example.com"
            onChange={(e) => updateField({ email: e.target.value })}
            onBlur={() => setEmailTouched(true)}
          />
          {emailError && <p className="input-error">{emailError}</p>}
        </div>

        <div className="contact-field">
          <label className="contact-label" htmlFor="contact-phone">
            Phone number
          </label>
          <input
            id="contact-phone"
            type="tel"
            className={`input-field contact-input ${phoneError ? 'input-field--error' : ''}`}
            value={phoneNumber}
            placeholder="06 12 34 56 78"
            onChange={(e) => updateField({ phoneNumber: e.target.value })}
            onBlur={() => setPhoneTouched(true)}
          />
          {phoneError && <p className="input-error">{phoneError}</p>}
          <p className="contact-hint">Useful if you would like to be called back by an advisor.</p>
        </div>
      </div>

      <p className="contact-privacy">
        We will use your contact details to assist you in your process, by email or phone.{' '}
        <a href="#privacy" className="contact-privacy-link">
          See our privacy policy
        </a>
      </p>
    </div>
  );
}
