# Copilot Guide for Café Fausse

## Languages
- Frontend: JavaScript (React + JSX)
- Backend: Python (Flask)
- Database: PostgreSQL

## Style & Constraints
- Use CSS Flexbox or Grid for layout.
- No TypeScript.
- Follow functional requirements from `docs/SRS.md`.
- All API calls must target Flask endpoints.
- Components should be modular and reusable.
- Maintain consistent naming (e.g., `ReservationForm`, `MenuList`).
- Create responsive designs for mobile and desktop.
- Create reusable components where necessary
- Use ES6+ syntax and features.
- 

## Directory Conventions
- `frontend/src/pages/*` → React pages
- `frontend/src/components/*` → reusable UI elements
- `frontend/src/assets/images/*` → image assets
- `frontend/src/services/*` → API utilities
- `backend/app.py` → Flask entry point
- `backend/database/*` → schema & ORM setup

## Examples for Copilot
When writing new files, refer to the relevant sections of `docs/SRS.md`.  
Example:
```js
// Implement ReservationPage per requirements.md section 3.1.3
