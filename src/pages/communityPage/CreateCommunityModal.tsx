import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateCommunityModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState<{ id: string; value: string }[]>([]);
  const [isPublishDisabled, setPublishDisabled] = useState(true);

  const handleAddRule = () => {
    setRules([...rules, { id: uuidv4(), value: "" }]);
    console.log(rules);
  };

  const handleRuleChange = (id, value) => {
    const newRules = rules.map((rule) => {
      if (rule.id === id) {
        rule.value = value;
        return rule;
      }
      return rule;
    });
    setRules(newRules);
  };

  const handleInputChange = () => {
    // Check if all inputs are filled
    const allFilled =
      name.trim() !== "" &&
      description.trim() !== "" &&
      rules.every((rule) => rule.value.trim() !== "");
    setPublishDisabled(!allFilled);
  };

  const handleRemoveRule = (id: string) => {
    const newRules = rules.filter((rule) => rule.id !== id);
    setRules([...newRules]);
  };
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          tr
          className={`  flex justify-center items-center min-h-[100vh] w-full fixed  top-0 left-0 z-50 bg-black/30 backdrop-blur-sm text-white `}
        >
          <div className="flex flex-col items-center space-y-4 p-6 w-full max-w-[800px] mx-auto border border-gray-800 rounded-md h-[90vh] overflow-y-auto no-scrollbar">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium ">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleInputChange();
                }}
                className="w-full px-3 py-2 border border-gray-700 bg-transparent text-white rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium ">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  handleInputChange();
                }}
                className="w-full px-3 py-2 border border-gray-700 bg-transparent text-white rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Rules</label>
              <AnimatePresence>
                {rules.map((rule) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    className="relative mb-1"
                  >
                    <input
                      type="text"
                      value={rule.value}
                      onChange={(e) => {
                        handleRuleChange(rule.id, e.target.value);
                        handleInputChange();
                      }}
                      className="relative w-full px-3 py-2 border border-gray-700 bg-transparent rounded focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleRemoveRule(rule.id)}
                      className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 transition-all h-full z-40 rounded-tr-sm rounded-br-sm px-4"
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button
                onClick={handleAddRule}
                className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Rule
              </button>
            </div>

            <div className="flex justify-end w-full">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-tl-md rounded-bl-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                disabled={isPublishDisabled}
                className={`px-4 py-2 bg-green-500 text-white rounded-tr-md rounded-br-md  ${
                  isPublishDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-600"
                }`}
              >
                Publish
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateCommunityModal;
