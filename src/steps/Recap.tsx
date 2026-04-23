import { useForm } from '../context/FormContext';
import './steps.css';
import './Recap.css';

const PROFILE_LABELS: Record<string, string> = {
  employee: 'Employee',
  self_employed: 'Self-employed',
  retired: 'Retired',
  civil_servant: 'Civil servant',
  student: 'Student',
};

const OPTICAL_LABELS: Record<string, string> = {
  nothing: 'Nothing at all',
  standard: 'Standard glasses or contact lenses',
  progressive: 'Progressive lenses',
  surgery: "Planning eye surgery",
};

const DENTAL_LABELS: Record<string, string> = {
  none: 'No cover',
  maintenance: 'Just maintenance (Scale & polish, fillings)',
  standard: 'Standard treatments (Crowns, bridges)',
  major: 'Major treatments (Implants, braces)',
};

const ALTERNATIVE_LABELS: Record<string, string> = {
  never: 'Never or almost never',
  one_two: '1 to 2 times a year',
  more_than_three: 'More than 3 times a year',
};

export default function Recap() {
  const { state } = useForm();
  const { data } = state;

  return (
    <div className="step">
      <h2 className="step-title">Your summary</h2>
      <p className="step-subtitle">
        Please review your selections before submitting.
      </p>

      <div className="recap-section">
        <h3 className="recap-section-title">Situation</h3>
        <div className="recap-grid">
          <RecapRow label="Profile" value={data.profile ? PROFILE_LABELS[data.profile] : '—'} />
          <RecapRow label="Partner cover" value={data.coverPartner ? 'Included' : 'Not included'} />
          <RecapRow
            label="Children cover"
            value={
              data.coverChildren
                ? `${data.numberOfChildren} child${data.numberOfChildren > 1 ? 'ren' : ''} included`
                : 'Not included'
            }
          />
          <RecapRow label="Age" value={data.age ? `${data.age} years` : '—'} />
          <RecapRow label="Postcode" value={data.postcode || '—'} />
        </div>
      </div>

      <div className="recap-section">
        <h3 className="recap-section-title">Special Needs</h3>
        <div className="recap-grid">
          <RecapRow label="Optical needs" value={OPTICAL_LABELS[data.opticalNeeds]} />
          <RecapRow label="Dental needs" value={DENTAL_LABELS[data.dentalNeeds]} />
          <RecapRow label="Alternative medicine" value={ALTERNATIVE_LABELS[data.alternativeMedicine]} />
        </div>
      </div>
    </div>
  );
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="recap-row">
      <span className="recap-label">{label}</span>
      <span className="recap-value">{value}</span>
    </div>
  );
}
