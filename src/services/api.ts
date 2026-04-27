import type { FormData } from '../types/form';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? '';

export interface RoomCostResponse {
  averageDailyRoomCost: number;
  currency: string;
}

export interface SaveFormResponse {
  uuid: string;
}

export interface OfferResponse {
  monthlyPremium: number;
  annualPremium: number;
  currency: string;
  coverageDetails: string[];
}

export async function getRoomCost(formData: FormData): Promise<RoomCostResponse> {
  const res = await fetch(`${BASE_URL}/room-cost`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Failed to fetch room cost');
  return res.json() as Promise<RoomCostResponse>;
}

export async function saveLeaveEmail(email: string, formData: FormData): Promise<void> {
  const res = await fetch(`${BASE_URL}/save-leave-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, formData }),
  });
  if (!res.ok) throw new Error('Failed to save email');
}

export async function saveForm(formData: FormData): Promise<SaveFormResponse> {
  const res = await fetch(`${BASE_URL}/save-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Failed to save form');
  return res.json() as Promise<SaveFormResponse>;
}

export async function getOfferByUuid(uuid: string): Promise<OfferResponse> {
  const res = await fetch(`${BASE_URL}/offer/${encodeURIComponent(uuid)}`, {
    signal: AbortSignal.timeout(130_000),
  });
  if (!res.ok) throw new Error('Failed to fetch offer');
  return res.json() as Promise<OfferResponse>;
}
