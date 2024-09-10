import React from "react";

const ShareModal = ({
  showModal,
  setShowModal,
  shareBlog,
  sharing
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  shareBlog: () => void;
  sharing:boolean
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(false);
  };
  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed top-0 left-0 w-full h-full bg-black/30 z-[100] ${
        showModal ? "" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute z-[120] text-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-10 "
      >
        <h2 className="text-xl font-bold mb-9">Share this post from your blog </h2>
        <div className="flex justify-end gap-3">
          <button className={`px-6 hover:bg-gray-200 hover:shadow-md hover:shadow-gray-700  shadow-sm bg-gray-100 shadow-gray-600 py-2 border-gray-300 rounded-md`}
            onClick={(e) => {
              e.preventDefault();
              shareBlog();
            }}
          >
            {sharing ? <span className="flex items-center">Sharing... <span className="inline-block size-5 border border-t-transparent border-black rounded-full animate-spin"></span></span>: "Share"}
          </button>
          <button className={`px-6 bg-red-500 hover:bg-red-700 hover:shadow-md hover:shadow-gray-800 text-white shadow-sm  shadow-gray-600 py-2 border-gray-300 rounded-md`} onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
