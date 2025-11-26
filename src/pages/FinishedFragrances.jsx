import React, { useState } from "react";
import { useUserFragrances } from "../hooks/useUserFragrances";
import { useAuth } from "../context/AuthContext";
import { FragranceTable } from "../components/FragranceTable";
import { FragranceTableSkeleton } from "../components/FragranceTableSkeleton";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import { useToast } from "../context/ToastContext";
import { useFragranceActions } from "../hooks/useFragranceActions";
import { motion } from "framer-motion";

export default function FinishedFragrances() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { fragrances, loading } = useUserFragrances(user.uid, "finished");
  const { deleteFragrance } = useFragranceActions(user.uid);
  const navigate = useNavigate();

  // Modal state
  const [modal, setModal] = useState({ type: null, id: null, name: "" });
  const openModal = (type, id, name) => setModal({ type, id, name });
  const closeModal = () => setModal({ type: null, id: null, name: "" });

  const handleConfirm = async () => {
    if (modal.type === "delete") {
      await deleteFragrance(modal.id);
      showToast(`Successfully deleted ${modal.name}!`, "success");
    }
    closeModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <BackButton navigateBack={() => navigate(-1)} />
      <h1 className="text-xl font-semibold mb-4">Finished Fragrances</h1>

      {loading ? (
        <FragranceTableSkeleton
          title={"Finished"}
          rows={7}
        ></FragranceTableSkeleton>
      ) : (
        <FragranceTable
          title="Finished"
          data={fragrances}
          onRequestDelete={(id, name) => openModal("delete", id, name)}
        />
      )}

      {/* Modal */}
      {modal.type && (
        <ConfirmModal
          onClose={closeModal}
          onConfirm={handleConfirm}
          name={modal.name}
          type={modal.type}
        />
      )}
    </motion.div>
  );
}
