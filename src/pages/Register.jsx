import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import AuthLayout from "../features/auth/AuthLayout";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (name, email, password) => {
    // Returns user (uid, email, displayName, photoURL), additionalUserInfo, and credential
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name in Firebase Auth
    await updateProfile(userCredential.user, {
      displayName: name
    });
    
    // Store user data in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
        "name": name,
        "email": email,     
        "preferences": {
            "gender": "",
            "notes": [],
            "accords": []
        },
        "createdAt": userCredential.user.metadata.creationTime,
        "fragranceStats": {
            "bookmarked": 0,
            "testing": 0,
            "finished": 0
        }
    });

    // Registration successful - navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <AuthLayout 
      title="Register" 
      subtitle="Create your FragraMap account"
      linkText="Already have an account?"
      linkPath="/login"
      onSubmit={handleRegister}
      buttonText="Register"
      showNameField={true}
    />
  );
}

export default Register;
