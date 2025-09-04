import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

// Custom hook to access the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

//   user = {
//     uid: "abc123def456",           // Unique user ID
//     email: "user@example.com",     // User's email
//     displayName: "John Doe",       // Display name (set by updateProfile)
//     emailVerified: true,           // Email verification status
//     photoURL: null,                // Profile photo URL
//     phoneNumber: null,             // Phone number (if set)
//     providerId: "firebase",        // Auth provider
//     metadata: {
//       creationTime: "2024-01-01T00:00:00.000Z",
//       lastSignInTime: "2024-01-15T10:30:00.000Z"
//     },
//     // ... more Firebase user properties
//   }

  const value = {
    user,
    loading,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
