import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import FragranceTest from "./pages/FragranceTest";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/profile" element={<Profile />}></Route>
        <Route path="/dashboard/settings" element={<Settings />}></Route>
        <Route
          path="/dashboard/fragrances/:fragranceId"
          element={<FragranceTest />}
        ></Route>

        
      </Route>
    </Routes>
  );
}

export default App;
