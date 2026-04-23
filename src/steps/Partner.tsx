import { useForm } from '../context/FormContext';
import './steps.css';

export default function Partner() {
  const { state, updateField } = useForm();
  const { coverPartner } = state.data;

  return (
    <div className="step">
      <h2 className="step-title">Would you like to cover your partner?</h2>
      <p className="step-subtitle">
        Your quote will include or exclude your partner depending on your choice. You can change
        this at any time after subscription.
      </p>
      <div className="toggle-group">
        <button
          className={`toggle-btn ${coverPartner ? 'toggle-btn--selected' : ''}`}
          onClick={() => updateField({ coverPartner: true })}
          aria-pressed={coverPartner}
        >
          Yes
        </button>
        <button
          className={`toggle-btn ${!coverPartner ? 'toggle-btn--selected' : ''}`}
          onClick={() => updateField({ coverPartner: false })}
          aria-pressed={!coverPartner}
        >
          No
        </button>
      </div>
      <div className="info-box">
        Your partner will {coverPartner ? 'be included' : 'not be included'} in your quote.
      </div>
    </div>
  );
}
