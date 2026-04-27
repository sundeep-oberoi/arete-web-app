# Implementation Plan

## Tech Stack
- Vite + React 18 + TypeScript
- Plain CSS with CSS custom properties
- localStorage for save/return persistence
- Multi-stage Docker: `node:20-alpine` (build) + `nginx:1.27-alpine` (serve)

## Color System
| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `#f5f9ff` | Page background |
| `--color-card` | `#ffffff` | Card/input background |
| `--color-card-hover` | `#e8f2ff` | Hover state |
| `--color-card-selected` | `#dbeafe` | Selected card fill |
| `--color-primary` | `#2563eb` | Primary action |
| `--color-primary-hover` | `#1d4ed8` | Button hover |
| `--color-text` | `#1e3a5f` | Body text |
| `--color-subtext` | `#5b7da3` | Hints, subtitles |
| `--color-border` | `#bfdbfe` | Default borders |

## Step Map
| Phase | Global Index | Step Name | Mandatory? |
|---|---|---|---|
| Situation (0) | 0 | Situation Intro | — (phase landing) |
| Situation (0) | 1 | General Profile | Yes |
| Situation (0) | 2 | Partner | No (default: not covered) |
| Situation (0) | 3 | Children | No (default: not covered) |
| Situation (0) | 4 | Age | Yes (18–85) |
| Situation (0) | 5 | Postcode | Yes (valid French) |
| Special Needs (1) | 6 | Special Needs Intro | — (phase landing) |
| Special Needs (1) | 7 | Optical Needs | No (default: Nothing at all) |
| Special Needs (1) | 8 | Dental Needs | No (default: No cover) |
| Special Needs (1) | 9 | Alternative Medicine | No (default: Never) |
| Special Needs (1) | 10 | Hospitalisation Preferences | No (default: Shared room) |
| Special Needs (1) | 11 | Choice of Doctors | Yes |
| Contact (2) | 12 | Contact Details | Yes (email OR phone) |
| Recap (3) | 13 | Summary | — |
| Your offer (4) | 14 | Review Offer | — |

## Validation Rules
- Step 1: `profile !== null`
- Step 4: `18 ≤ parseInt(age) ≤ 85`
- Step 5: `/^(?:0[1-9]|[1-8]\d|9[0-5])\d{3}$|^97[1-6]\d{2}$/`
- Step 11: `doctorChoice !== null`
- Step 12: `isValidEmail(email) || isValidFrenchMobile(phoneNumber)`
  - French mobile: 10 digits, starts with 06 or 07

## Leave & Return Feature
- "Save & return later" button in header
- Saves `FormState` to localStorage for resume on page reload
- Opens a modal requesting a valid email address
- Calls `POST /api/save-leave-email` with the email and form data
- Shows a "have a nice day" goodbye screen after submission

## Backend API Calls
- `POST /api/room-cost` — fetched on HospitalisationPreferences mount, displays average daily room cost
- `POST /api/save-leave-email` — called when user leaves via "Save & return later"
- `POST /api/save-form` — called on ReviewOffer mount; saves form data, returns UUID
- `GET /api/offer/{uuid}` — called after save-form; retried up to 5× on timeout (130 s each); displays monthly/annual premium

## File Structure
```
arete-web-app/
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── App.tsx / App.css
│   ├── types/form.ts
│   ├── utils/validation.ts
│   ├── context/FormContext.tsx
│   ├── services/api.ts
│   ├── components/
│   │   ├── ProgressBar.tsx / .css
│   │   └── Navigation.tsx / .css
│   └── steps/
│       ├── steps.css
│       ├── GeneralProfile.tsx
│       ├── Partner.tsx
│       ├── Children.tsx
│       ├── Age.tsx
│       ├── Postcode.tsx
│       ├── OpticalNeeds.tsx
│       ├── DentalNeeds.tsx
│       ├── AlternativeMedicine.tsx
│       ├── HospitalisationPreferences.tsx
│       ├── ChoiceOfDoctors.tsx
│       ├── ContactDetails.tsx / .css
│       ├── Recap.tsx / .css
│       └── ReviewOffer.tsx / .css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── Dockerfile
├── nginx.conf
└── .dockerignore
```
