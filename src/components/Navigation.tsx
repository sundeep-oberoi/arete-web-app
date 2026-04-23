import { useForm } from '../context/FormContext';
import { canProceed } from '../utils/validation';
import './Navigation.css';

interface Props {
  onSubmit: () => void;
}

export default function Navigation({ onSubmit }: Props) {
  const { state, nextStep, prevStep } = useForm();
  const { currentStep, data } = state;
  const isLastStep = currentStep === 8;
  const isFirstStep = currentStep === 0;
  const canNext = canProceed(currentStep, data);

  return (
    <div className="navigation">
      {!isFirstStep && (
        <button onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
      )}
      {isFirstStep && <div />}
      {isLastStep ? (
        <button onClick={onSubmit} className="btn-primary">
          Submit quote
        </button>
      ) : (
        <button onClick={nextStep} className="btn-primary" disabled={!canNext}>
          Continue →
        </button>
      )}
    </div>
  );
}
