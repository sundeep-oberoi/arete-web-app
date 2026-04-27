import { useForm } from '../context/FormContext';
import { canProceed } from '../utils/validation';
import './Navigation.css';

export default function Navigation() {
  const { state, nextStep, prevStep } = useForm();
  const { currentStep, data } = state;
  const isLastStep = currentStep === 14;
  const isRecapStep = currentStep === 13;
  const isFirstStep = currentStep === 0;
  const canNext = canProceed(currentStep, data);

  let nextLabel = 'Continue →';
  if (currentStep === 0) nextLabel = "Let's get started";
  else if (currentStep === 6) nextLabel = "Let's continue";
  else if (isRecapStep) nextLabel = 'Get my offer';

  return (
    <div className="navigation">
      {!isFirstStep && (
        <button onClick={prevStep} className="btn-secondary">
          ← Back
        </button>
      )}
      {isFirstStep && <div />}
      {isLastStep ? (
        <div />
      ) : (
        <button onClick={nextStep} className="btn-primary" disabled={!canNext}>
          {nextLabel}
        </button>
      )}
    </div>
  );
}
