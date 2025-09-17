// src/context/ToastContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = useCallback((message, severity) => {
    setToast({ open: true, message, severity });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast({...toast, open: false})}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          sx={{
            backgroundColor: "var(--color-neutral-cool-50)",
            padding: "1rem 1.5rem",
            color: "var(--color-neutral-cool-900)",
            borderTop: "6px solid var(--color-primary-900)",
            borderRadius: "4px",
            fontWeight: "bold",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
