import { useState } from "react";
import useBoundStore from "../../zustand/store";
import CreateCommunityModal from "./CreateCommunityModal";

const CreateCommunitySection = () => {
  const userId = useBoundStore((state) => state.auth.id);
  const [showModal, setShowModal] = useState(false);
  if (!userId) return null;

  return (
    <div className="flex justify-center items-center text-black dark:text-white">
      <button
        className="bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 hover:dark:bg-gray-900"
        onClick={() => setShowModal(true)}
      >
        Create New
      </button>

      {/* create modal */}
      <CreateCommunityModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default CreateCommunitySection;
