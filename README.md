# FragraMap 🌸  

FragraMap is a modern web app for discovering and managing fragrances. It was built to solve the challenge of keeping track of fragrance testing, preferences, and collections in a structured and accessible way—something fragrance enthusiasts often do manually.

Users can search fragrances via an integrated API, save them to their personal collection with notes and ratings, and track their testing progress over time.

To use it: simply sign up or log in, search for a fragrance, and start building your collection. The app runs on React (Vite) + Firebase, with TailwindCSS for styling and Framer Motion for smooth animations.

---

**Live Demo** → [https://fragramap.web.app](https://fragramap.web.app)  

---

## 📸 Example Screenshots  

### Dashboard Page  
<img width="1212" height="539" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/31ad348f-9d27-4f46-8f78-210a138f95ff" />

### Search Results Page (example: "Dior")  
<img width="1230" height="764" alt="Search Screenshot" src="https://github.com/user-attachments/assets/7604ecfb-ec13-4f0e-b8bf-88b8c4f0b5a4" />

### Fragrance Info Card (example: "Dior Sauvage")  
<img width="631" height="773" alt="Fragrance Card Screenshot" src="https://github.com/user-attachments/assets/15e96a0d-2947-46f8-a1d0-4e22247d0e6d" />

### Single Fragrance Test  
<img width="650" height="539" alt="Fragrance Test Screenshot" src="https://github.com/user-attachments/assets/72e41d56-87b1-428b-8ff5-05ed02655ead" />

---

## 🛠 Tech Stack  
- **Frontend:** React (Vite), React Router, TailwindCSS, Framer Motion, MUI, Day.js  
- **Backend:** Firebase (Auth, Firestore, Functions, Hosting)  
- **CI/CD:** GitHub Actions → Firebase Hosting  

---

## ✨ Features  
- 🔎 **Search fragrances** via server-side API integration  
- 💾 **Save fragrances** to a personal collection with notes & ratings  
- 📝 **View fragrance details** (notes, accords, longevity, sillage)  
- 🧪 **Track testing progress** and discover your own fragrance preferences  

---

## 📂 Project Structure (High-Level)  

src/

components/ # Reusable UI (Button, NavBar, Modals)

context/ # Auth provider

features/ # Feature modules (auth, search)

pages/ # Route-level pages

services/ # Firestore/API services

firebase/ # Firebase init

assets/ # Static assets

---

## 🚀 Quick Start  

**Requirements:** Node.js 18+, Firebase CLI  

```bash
# install dependencies
npm install

# run frontend locally
npm run dev

# run Firebase emulators (Firestore + Functions)
firebase emulators:start
