import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import AuthLayout from "../features/auth/AuthLayout";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, { displayName: name });

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      preferences: { gender: "", notes: [], accords: [] },
      createdAt: userCredential.user.metadata.creationTime,
      fragranceStats: { bookmarked: 0, testing: 0, finished: 0 },
    });

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
      showNameField
    />
  );
}

export default Register;
