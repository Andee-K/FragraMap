import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserFragrances } from "../hooks/useUserFragrances";
import { FragranceTable } from "../components/FragranceTable";
import SearchBar from "../features/search/SearchBar";
import ConfirmModal from "../components/ConfirmModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useFragranceActions } from "../hooks/useFragranceActions";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fragrances, loading } = useUserFragrances(user.uid);
  const { deleteFragrance, finishFragrance } = useFragranceActions(user.uid);

  const [activeTab, setActiveTab] = useState("testing");

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Toast state
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  // Modal state for both delete and finish
  const [modal, setModal] = useState({ type: null, fragranceId: null });

  // opens delete/finish modal with fragrance info
  const openModal = (type, fragranceId) => setModal({ type, fragranceId });
  const closeModal = () => setModal({ type: null, fragranceId: null });

  const handleConfirm = async () => {
    if (modal.type === "delete") {
      await deleteFragrance(modal.fragranceId);
      setToast({
        open: true,
        message: `${modal.fragranceId} has been deleted`,
        severity: "error",
      });
    }

    if (modal.type === "finish") {
      await finishFragrance(modal.fragranceId);
      setToast({
        open: true,
        message: `${modal.fragranceId} marked as finished`,
        severity: "success",
      });
    }

    closeModal();
  };

  if (loading) {
    return (
      <div className="dashboard-container p-5 sm:p-8 max-break-w:px-0">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container p-5 sm:p-8 max-break-w:px-0">
      <h1 className="text-2xl">
        Welcome, <span className="font-medium">{user.displayName}!</span>
      </h1>
      <SearchBar onSearch={handleSearch} loading={false} />
      <h2 className="text-xl font-semibold mb-4">Your Fragrances</h2>
      <>
        <div>
          {/* Tabs */}
          <div className="relative">
            <div className="flex border-b mb-4 relative">
              <button
                className={`flex-1 py-4 text-center hover:cursor-pointer rounded-t-md ${
                  activeTab === "testing"
                    ? "font-bold text-primary-900 border-2 border-primary-900 bg-neutral-cool-100"
                    : "font-medium"
                }`}
                onClick={() => setActiveTab("testing")}
              >
                Testing
              </button>
              <button
                className={`flex-1 py-4 text-center hover:cursor-pointer rounded-t-md ${
                  activeTab === "bookmarked"
                    ? "font-bold text-primary-900 border-2 border-primary-900 bg-neutral-cool-100"
                    : "font-medium"
                }`}
                onClick={() => setActiveTab("bookmarked")}
              >
                Bookmarked
              </button>

              {/* Sliding underline */}
              <span
                className={`absolute bottom-0 left-0 h-[3px] w-1/2 bg-primary-900 transition-transform duration-300 ease-in-out`}
                style={{
                  transform:
                    activeTab === "testing"
                      ? "translateX(0%)"
                      : "translateX(100%)",
                }}
              />
            </div>
          </div>

          {activeTab === "testing" && (
            <FragranceTable
              title="Testing"
              data={fragrances.testing}
              onRequestDelete={(f) => openModal("delete", f)}
              onRequestFinish={(f) => openModal("finish", f)}
            />
          )}
          {activeTab === "bookmarked" && (
            <FragranceTable
              title="Bookmarked"
              data={fragrances.bookmarked}
              onRequestDelete={(f) => openModal("delete", f)}
              onRequestFinish={(f) => openModal("finish", f)}
            />
          )}
        </div>
      </>

      {/* ✅ Single modal instance */}
      {modal.type && (
        <ConfirmModal
          onClose={closeModal}
          onConfirm={handleConfirm}
          fragranceId={modal.fragranceId}
          type={modal.type}
        />
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={null}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
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
    </div>
  );
}
