import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useUserFragrances } from "../hooks/useUserFragrances";
import { FragranceTable } from "../components/FragranceTable";
import SearchBar from "../features/search/SearchBar";
import ConfirmModal from "../components/ConfirmModal";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useToast } from "../context/ToastContext";
import { useFragranceActions } from "../hooks/useFragranceActions";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fragrances, loading } = useUserFragrances(user.uid);
  const { deleteFragrance, finishFragrance } = useFragranceActions(user.uid);
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("testing");

  // Modal state for both delete and finish
  const [modal, setModal] = useState({ type: null, id: null, name: "" });

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
    }
  };

  // opens delete/finish modal with fragrance info
  const openModal = (type, id, name) => setModal({ type, id, name });
  const closeModal = () =>
    setModal({ type: null, fragranceId: null, name: "" });

  const handleConfirm = async () => {
    if (modal.type === "delete") {
      await deleteFragrance(modal.id);
      showToast(`Successfully deleted ${modal.name}!`, "success");
    }

    if (modal.type === "finish") {
      await finishFragrance(modal.id);
      showToast(`Successfully marked ${modal.name} as finished!`, "success");
    }

    closeModal();
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-medium mt-2 mb-4">
        Welcome, <span className="font-bold">{user.displayName}!</span>
      </h1>
      <h2 className="font-semibold text-xl mt-4">
        Add a new fragrance to your collection
      </h2>

      <SearchBar onSearch={handleSearch} loading={false} />
      <div className="fragrance-header flex align-baseline justify-between mb-4 mt-8">
        <h2 className="text-xl font-semibold">Your Fragrances</h2>
        <Link
          to="/dashboard/finished"
          className="flex text-normal items-center text-right font-semibold gap-2 hover:text-neutral-cool-800 hover:scale-102 transition hover:underline underline-offset-3"
        >
          View Finished Fragrances
          <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
        </Link>
      </div>

      {/* Tabs */}
      <div className="relative">
        <div className="flex border-b relative">
          <button
            className={`flex-1 py-4 text-center hover:bg-primary-50 transition hover:cursor-pointer rounded-t-lg ${
              activeTab === "testing"
                ? "font-bold text-primary-900 border-3 border-primary-50 bg-neutral-cool-100"
                : "font-medium"
            }`}
            onClick={() => setActiveTab("testing")}
          >
            Testing
          </button>
          <button
            className={`flex-1 py-4 text-center hover:bg-primary-50 transition hover:cursor-pointer rounded-t-lg ${
              activeTab === "bookmarked"
                ? "font-bold text-primary-900 border-2 border-primary-50 bg-neutral-cool-100"
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
                activeTab === "testing" ? "translateX(0%)" : "translateX(100%)",
            }}
          />
        </div>
      </div>

      {activeTab === "testing" && (
        <FragranceTable
          title="Testing"
          data={fragrances.testing}
          loading={loading}
          onRequestDelete={(id, name) => openModal("delete", id, name)}
          onRequestFinish={(id, name) => openModal("finish", id, name)}
        />
      )}
      {activeTab === "bookmarked" && (
        <FragranceTable
          title="Bookmarked"
          data={fragrances.bookmarked}
          loading={loading}
          onRequestDelete={(id, name) => openModal("delete", id, name)}
          onRequestFinish={(id, name) => openModal("finish", id, name)}
        />
      )}

      {/* For deleting or submitting test */}
      {modal.type && (
        <ConfirmModal
          onClose={closeModal}
          onConfirm={handleConfirm}
          name={modal.name}
          type={modal.type}
        />
      )}
    </div>
  );
}
