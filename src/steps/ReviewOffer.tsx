import { useState, useEffect, useRef } from 'react';
import { useForm } from '../context/FormContext';
import { saveForm, getOfferByUuid, OfferPendingError } from '../services/api';
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

const MAX_RETRIES = 5;
const APOLOGY_DELAY_MS = 60_000;

type Status = 'loading' | 'success' | 'give_up' | 'error';

function isRetriable(err: unknown): boolean {
  return err instanceof OfferPendingError ||
    (err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError'));
}

export default function ReviewOffer() {
  const { state, reset } = useForm();
  const { data } = state;
  const [offer, setOffer] = useState<OfferResponse | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [showApology, setShowApology] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const apologyTimer = setTimeout(() => setShowApology(true), APOLOGY_DELAY_MS);

    async function fetchOffer() {
      let uuid: string;
      try {
        const saved = await saveForm(data);
        uuid = saved.uuid;
      } catch {
        clearTimeout(apologyTimer);
        setStatus('error');
        return;
      }

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          const res = await getOfferByUuid(uuid);
          clearTimeout(apologyTimer);
          setOffer(res);
          setStatus('success');
          return;
        } catch (err) {
          if (!isRetriable(err)) {
            clearTimeout(apologyTimer);
            setStatus('error');
            return;
          }
        }
      }
      clearTimeout(apologyTimer);
      setStatus('give_up');
    }

    void fetchOffer();

    return () => clearTimeout(apologyTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="step">
      <h2 className="step-title">Your personalised offer</h2>

      {status === 'loading' && (
        <div className="offer-loading-container">
          <div className="offer-spinner" aria-label="Loading" />
          <p className="step-subtitle offer-loading-msg">
            {showApology
              ? "We're working hard to get your offer — thank you for your patience!"
              : 'This may take up to 3 minutes. Calculating your offer…'}
          </p>
        </div>
      )}

      {status === 'give_up' && (
        <>
          <div className="info-box offer-giveup">
            <p>We will contact you soon with your personalised offer.</p>
            <p style={{ marginTop: '0.5rem' }}>Thank you for your patience!</p>
          </div>
          <div className="offer-restart-row">
            <button onClick={reset} className="btn-secondary">
              Start again
            </button>
          </div>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="info-box offer-error">
            <p>We could not load your offer at this time. Please try again later.</p>
          </div>
          <div className="offer-restart-row">
            <button onClick={reset} className="btn-secondary">
              Start again
            </button>
          </div>
        </>
      )}

      {status === 'success' && offer && (
        <>
          <div className="offer-price-card">
            <div className="offer-price-label">Monthly premium</div>
            <div className="offer-price">€{offer.monthlyPremium.toFixed(2)}</div>
            <div className="offer-price-annual">€{offer.annualPremium.toFixed(2)} / year</div>
          </div>

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

          <div className="offer-restart-row">
            <button onClick={reset} className="btn-secondary">
              Start again
            </button>
          </div>
        </>
      )}
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
