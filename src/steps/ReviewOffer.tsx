import { useState, useEffect, useRef } from 'react';
import { useForm } from '../context/FormContext';
import { getFinalOffer } from '../services/api';
import type { OfferResponse } from '../services/api';
import './steps.css';
import './ReviewOffer.css';

const PROFILE_LABELS: Record<string, string> = {
  employee: 'Employee',
  self_employed: 'Self-employed',
  retired: 'Retired',
  civil_servant: 'Civil servant',
  student: 'Student',
};

const HOSPITALISATION_LABELS: Record<string, string> = {
  shared: 'A shared room suits me',
  private_preferred: 'I prefer a private room if possible',
  private_essential: 'A private room is essential for me',
};

const DOCTOR_LABELS: Record<string, string> = {
  gp_specialist: 'GPs and occasionally a specialist',
  specialist_standard: 'Specialists at standard rates',
  specialist_private: 'Specialists, private rates',
};

export default function ReviewOffer() {
  const { state } = useForm();
  const { data } = state;
  const [offer, setOffer] = useState<OfferResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    getFinalOffer(data)
      .then((res) => {
        setOffer(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="step">
      <h2 className="step-title">Your personalised offer</h2>

      {loading && (
        <p className="step-subtitle offer-loading">Calculating your offer…</p>
      )}

      {error && (
        <div className="info-box offer-error">
          We could not load your offer at this time. You can still submit your details and we will
          get back to you with a quote.
        </div>
      )}

      {offer && (
        <div className="offer-price-card">
          <div className="offer-price-label">Monthly premium</div>
          <div className="offer-price">€{offer.monthlyPremium.toFixed(2)}</div>
          <div className="offer-price-annual">€{offer.annualPremium.toFixed(2)} / year</div>
        </div>
      )}

      <div className="offer-summary">
        <h3 className="offer-summary-title">Summary of your selections</h3>

        <div className="recap-section">
          <h4 className="recap-section-title">Situation</h4>
          <div className="recap-grid">
            <OfferRow label="Profile" value={data.profile ? PROFILE_LABELS[data.profile] : '—'} />
            <OfferRow label="Partner cover" value={data.coverPartner ? 'Included' : 'Not included'} />
            <OfferRow
              label="Children cover"
              value={
                data.coverChildren
                  ? `${data.numberOfChildren} child${data.numberOfChildren !== 1 ? 'ren' : ''} included`
                  : 'Not included'
              }
            />
            <OfferRow label="Age" value={data.age ? `${data.age} years` : '—'} />
            <OfferRow label="Postcode" value={data.postcode || '—'} />
          </div>
        </div>

        <div className="recap-section">
          <h4 className="recap-section-title">Special Needs</h4>
          <div className="recap-grid">
            <OfferRow label="Hospitalisation" value={HOSPITALISATION_LABELS[data.hospitalisationPreference]} />
            <OfferRow label="Choice of doctors" value={data.doctorChoice ? DOCTOR_LABELS[data.doctorChoice] : '—'} />
          </div>
        </div>
      </div>
    </div>
  );
}

function OfferRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="recap-row">
      <span className="recap-label">{label}</span>
      <span className="recap-value">{value}</span>
    </div>
  );
}
