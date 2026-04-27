import './ProgressBar.css';

const PHASES = [
  { name: 'Situation', stepCount: 5, startStep: 1 },      // intro at 0, steps at 1–5
  { name: 'Special Needs', stepCount: 5, startStep: 7 },  // intro at 6, steps at 7–11
  { name: 'Contact', stepCount: 1, startStep: 12 },
  { name: 'Recap', stepCount: 1, startStep: 13 },
  { name: 'Your offer', stepCount: 1, startStep: 14 },
];

interface Props {
  currentStep: number;
}

function getCurrentPhaseIndex(step: number): number {
  if (step <= 5) return 0;
  if (step <= 11) return 1;
  if (step <= 12) return 2;
  if (step <= 13) return 3;
  return 4;
}

export default function ProgressBar({ currentStep }: Props) {
  const activePhaseIndex = getCurrentPhaseIndex(currentStep);

  return (
    <div className="progress-bar" role="navigation" aria-label="Form progress">
      {PHASES.map((phase, phaseIndex) => {
        const isActive = phaseIndex === activePhaseIndex;
        const isCompleted = phaseIndex < activePhaseIndex;
        const steps = Array.from({ length: phase.stepCount }, (_, i) => phase.startStep + i);

        return (
          <div
            key={phaseIndex}
            className={[
              'pb-phase',
              isActive ? 'pb-phase--active' : '',
              isCompleted ? 'pb-phase--completed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="pb-phase-header">
              <div className="pb-phase-num">
                {isCompleted ? '✓' : phaseIndex + 1}
              </div>
              <span className="pb-phase-name">{phase.name}</span>
            </div>

            <div className="pb-steps">
              {steps.map((stepIndex) => (
                <div
                  key={stepIndex}
                  className={[
                    'pb-dot',
                    stepIndex === currentStep ? 'pb-dot--active' : '',
                    stepIndex < currentStep ? 'pb-dot--done' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              ))}
            </div>

            {phaseIndex < PHASES.length - 1 && (
              <div className={`pb-connector ${isCompleted ? 'pb-connector--done' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
