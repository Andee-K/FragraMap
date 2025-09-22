```
# FragraMap 🌸

A modern fragrance discovery and collection app.

[**Live Demo**](https://fragramap.web.app)

<br>

<img width="1212" alt="FragraMap Dashboard" src="https://github.com/user-attachments/assets/31ad348f-9d27-4f46-8f78-210a138f95ff">
<img width="1230" alt="FragraMap Search Results" src="https://github.com/user-attachments/assets/7604ecfb-ec13-4f0e-b8bf-88b8c4f0b5a4">
<img width="631" alt="FragraMap Fragrance Info Card" src="https://github.com/user-attachments/assets/15e96a0d-2947-46f8-a1d0-4e22247d0e6d">
<img width="650" alt="FragraMap Single Fragrance Test" src="https://github.com/user-attachments/assets/72e41d56-87b1-428b-8ff5-05ed02655ead">

---

## Features

FragraMap allows users to:

* **Search**: Find any fragrance through a powerful server-side API integration.
* **Collect**: Save fragrances to a personal collection with custom notes and ratings.
* **Discover**: View detailed information like fragrance notes, accords, longevity, and sillage.
* **Track**: Keep a log of fragrance testing progress and discover personal preferences.

---

## Tech Stack

* **Frontend**: React (Vite)
* **Styling**: TailwindCSS, MUI, Framer Motion
* **State & Data**: Day.js
* **Backend**: Firebase (Authentication, Firestore, Cloud Functions)

---

## Project Structure

```

src/
├── components/       \# Reusable UI components (e.g., Button, NavBar, Modals)
├── context/          \# React Context providers (e.g., AuthProvider)
├── features/         \# Modular features (e.g., auth, search)
├── pages/            \# Route-level pages
├── services/         \# API and Firestore service functions
├── firebase/         \# Firebase initialization
└── assets/           \# Static assets (images, fonts, etc.)

````

---

## Quick Start

### Requirements
* Node.js 18+
* Firebase CLI

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)<your-username>/FragraMap.git
    cd FragraMap
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the Firebase emulators** (Firestore and Functions):
    ```bash
    firebase emulators:start
    ```
4.  **Run the app locally:**
    ```bash
    npm run dev
    ```
````
