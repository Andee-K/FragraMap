import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import FragranceTest from './pages/FragranceTest'
import ProtectedRoute from './features/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route path="fragrance-test/:id" element={<ProtectedRoute><FragranceTest></FragranceTest></ProtectedRoute>}></Route>
        <Route path="profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}></Route>
        <Route path="settings" element={<ProtectedRoute><Settings></Settings></ProtectedRoute>}></Route>
      </Route>
    </Routes>
  )
}

export default App
