import { useForm } from '../context/FormContext';
import './steps.css';

export default function Children() {
  const { state, updateField } = useForm();
  const { coverChildren, numberOfChildren } = state.data;

  const handleToggle = (value: boolean) => {
    updateField({ coverChildren: value, numberOfChildren: value ? Math.max(numberOfChildren, 1) : 0 });
  };

  const decrement = () =>
    updateField({ numberOfChildren: Math.max(1, numberOfChildren - 1) });

  const increment = () =>
    updateField({ numberOfChildren: numberOfChildren + 1 });

  return (
    <div className="step">
      <h2 className="step-title">Would you like to cover your children?</h2>
      <p className="step-subtitle">
        Your premium accurately reflects your household composition. Children over 25 must take out
        their own policy.
      </p>
      <div className="toggle-group">
        <button
          className={`toggle-btn ${coverChildren ? 'toggle-btn--selected' : ''}`}
          onClick={() => handleToggle(true)}
          aria-pressed={coverChildren}
        >
          Yes
        </button>
        <button
          className={`toggle-btn ${!coverChildren ? 'toggle-btn--selected' : ''}`}
          onClick={() => handleToggle(false)}
          aria-pressed={!coverChildren}
        >
          No
        </button>
      </div>

      {coverChildren && (
        <>
          <p className="step-subtitle" style={{ marginBottom: '0.5rem' }}>
            How many children?
          </p>
          <div className="counter-group">
            <button
              className="counter-btn"
              onClick={decrement}
              disabled={numberOfChildren <= 1}
              aria-label="Decrease"
            >
              −
            </button>
            <span className="counter-value">{numberOfChildren}</span>
            <button className="counter-btn" onClick={increment} aria-label="Increase">
              +
            </button>
          </div>
        </>
      )}

      <div className="info-box">
        {coverChildren
          ? `${numberOfChildren} child${numberOfChildren > 1 ? 'ren' : ''} will be included in your quote.`
          : 'No children will be included in your quote.'}
      </div>
    </div>
  );
}
