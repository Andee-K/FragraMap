FragraMap 🌸

Live Demo → https://fragramap.web.app

Example Screenshots:

- Dashboard page:
<img width="1212" height="539" alt="Screenshot 2025-09-22 at 1 23 12 PM" src="https://github.com/user-attachments/assets/31ad348f-9d27-4f46-8f78-210a138f95ff" />

- Search results page (ex. "Dior"):
<img width="1230" height="764" alt="Screenshot 2025-09-22 at 1 24 01 PM" src="https://github.com/user-attachments/assets/7604ecfb-ec13-4f0e-b8bf-88b8c4f0b5a4" />

- Example of fragrance info card (ex. "Dior Sauvage):
<img width="631" height="773" alt="Screenshot 2025-09-22 at 1 24 29 PM" src="https://github.com/user-attachments/assets/15e96a0d-2947-46f8-a1d0-4e22247d0e6d" />

- Example of single fragrance test:
<img width="650" height="539" alt="Screenshot 2025-09-22 at 1 26 53 PM" src="https://github.com/user-attachments/assets/72e41d56-87b1-428b-8ff5-05ed02655ead" />


Tech Stack → React (Vite) · Firebase (Auth, Firestore, Functions) · TailwindCSS · Framer Motion · MUI · Day.js

FragraMap is a modern fragrance discovery and collection app.

Users can:

- Search for any fragrance (via server-side API integration)
  
- Save fragrances to their collection with notes/ratings

- View fragrance details such as fragrance notes, accords, longevity, sillage
  
- Keep track of their testing progress and figure out their own preferences in fragrances

📂 Project Structure (High-Level)

src/
  components/      # Reusable UI (Button, NavBar, Modals)
  context/         # Auth provider
  features/        # Feature modules (auth, search)
  pages/           # Route-level pages
  services/        # Firestore/API services
  firebase/        # Firebase init
  assets/          # Static assets

🛠 Quick Start

Requirements: Node 18+, Firebase CLI

# install deps
npm install

# run locally
npm run dev

# run Firebase emulators (Firestore + Functions)
firebase emulators:start
