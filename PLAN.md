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
| Situation (0) | 0 | General Profile | Yes |
| Situation (0) | 1 | Partner | No (default: not covered) |
| Situation (0) | 2 | Children | No (default: not covered) |
| Situation (0) | 3 | Age | Yes (18–85) |
| Situation (0) | 4 | Postcode | Yes (valid French) |
| Special Needs (1) | 5 | Optical Needs | No (default: Nothing at all) |
| Special Needs (1) | 6 | Dental Needs | No (default: No cover) |
| Special Needs (1) | 7 | Alternative Medicine | No (default: Never) |
| Recap (2) | 8 | Summary + Submit | — |

## Validation Rules
- Step 0: `profile !== null`
- Step 3: `18 ≤ parseInt(age) ≤ 85`
- Step 4: `/^(?:0[1-9]|[1-8]\d|9[0-5])\d{3}$|^97[1-6]\d{2}$/`

## Leave & Return Feature
- "Save & return later" button in header
- Saves `FormState` to localStorage, shows a toast confirmation
- On app load: if localStorage key present, show resume modal

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
│       └── Recap.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── Dockerfile
├── nginx.conf
└── .dockerignore
```
