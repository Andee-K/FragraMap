const ConfirmModal = ({ onClose, onConfirm, name, type }) => {
  const isDelete = type === "delete";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-neutral-cool-50 rounded-xl shadow-xl w-full max-w-md p-8">
        {/* Title */}
        <h2 className="text-xl font-bold text-neutral-cool-900 mb-2">
          {isDelete ? "Delete Fragrance" : "Finish Fragrance"}
        </h2>

        {/* Message */}
        <p className="text-neutral-cool-800 mb-6">
          {isDelete ? (
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-neutral-cool-900">
                {name}
              </span>
              ? This action cannot be undone.
            </>
          ) : (
            <>
              Mark{" "}
              <span className="font-semibold  text-neutral-cool-900">
                {name}
              </span>{" "}
              as finished? This action cannot be undone.
            </>
          )}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-neutral-cool-700 hover:text-neutral-cool-600 hover:cursor-pointer hover:underline underline-offset-2 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white font-semibold hover:cursor-pointer transition ${
              isDelete
                ? "bg-red-700 hover:bg-red-800"
                : "bg-primary-900 hover:bg-primary-950"
            }`}
          >
            {isDelete ? "Delete" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
