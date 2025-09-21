import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../features/auth/AuthLayout";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome back to FragraMap"
      linkText="Don't have an account?"
      linkPath="/register"
      onSubmit={handleLogin}
      buttonText="Login"
    />
  );
}

export default Login;
