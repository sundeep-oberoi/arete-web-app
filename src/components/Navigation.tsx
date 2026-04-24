import { useForm } from '../context/FormContext';
import { canProceed } from '../utils/validation';
import './Navigation.css';

interface Props {
  onSubmit: () => void;
}

export default function Navigation({ onSubmit }: Props) {
  const { state, nextStep, prevStep } = useForm();
  const { currentStep, data } = state;
  const isLastStep = currentStep === 12;
  const isRecapStep = currentStep === 11;
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
      ) : isRecapStep ? (
        <button onClick={nextStep} className="btn-primary" disabled={!canNext}>
          View my offer →
        </button>
      ) : (
        <button onClick={nextStep} className="btn-primary" disabled={!canNext}>
          Continue →
        </button>
      )}
    </div>
  );
}
