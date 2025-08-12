import React from "react";


const ImageModal = ({ open, onClose, image, comments }) => {
  if (!open) return null;

  // Close modal if click on backdrop (not modal content)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-4 relative flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={image}
          alt="Post"
          className="max-h-[60vh] w-auto object-contain rounded mb-4"
        />
        <div className="w-full max-h-40 overflow-y-auto mt-2">
          <h3 className="font-semibold mb-2">Comments</h3>
          {comments && comments.length > 0 ? (
            comments.map((c, idx) => (
              <div key={c._id || idx} className="mb-2 p-2 bg-gray-100 rounded">
                <div className="font-medium">{c.user?.f_name || "User"}</div>
                <div className="text-sm text-gray-700">{c.comment}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">No comments yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
