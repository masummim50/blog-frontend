import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useBoundStore from "../../zustand/store";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import { queryClient } from "../../main";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import CommunityImage from "../communityPage/CommunityImage";
import CommunityCoverImage from "../communityPage/CommunityCoverImage";

const CommunityEditModal = ({ community }: { community: any }) => {
  const userId = useBoundStore((state) => state.auth.id);
  const [showModal, setShowModal] = React.useState(false);

  // const [existingRules, setExistingRules] = useState<
  //   { id: string; value: string }[]
  // >(
  //   community?.rules?.map((rule) => {
  //     return {
  //       id: uuidv4(),
  //       value: rule,
  //     };
  //   })
  // );

  const [name, setName] = useState(community?.name);
  const [description, setDescription] = useState(community?.description);
  const [image, setImage] = useState(community?.image);
  const [coverImage, setCoverImage] = useState(community?.coverImage);
  const [rules, setRules] = useState<{ id: string; value: string }[]>(
    community?.rules?.map((rule) => {
      return {
        id: uuidv4(),
        value: rule,
      };
    })
  );
  const [disableButton, setDisableButton] = useState(false);

  const updateCommunityMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      rules: string[];
      image: string;
      coverImage: string;
    }) => {
      const response = await axiosInstance.patch(`/community/update/${community._id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Community updated successfully");
      setShowModal(false);
      queryClient.setQueryData([`community-${community._id}`], (oldData:any)=> {
        return {
            ...oldData, data: data.data
        }
      });
    },
  });

  const handleAddRule = () => {
    setRules([...rules, { id: uuidv4(), value: "" }]);
    setDisableButton(true);
  };

  const handleRuleChange = (id, value) => {
    const newRules = rules.map((rule) => {
      if (rule.id === id) {
        rule.value = value;
        return rule;
      }
      return rule;
    });
    if(value === "") {
        setDisableButton(true)
    }else{
        setDisableButton(false)
    }
    setRules(newRules);
  };

  const handleInputChange = () => {
    // Check if all inputs are filled
    const allFilled =
      name.trim() !== "" &&
      description.trim() !== "" &&
      (rules.length === 0 || rules.every((rule) => rule.value.trim() !== ""));
    setDisableButton(!allFilled);
  };

  const handleRemoveRule = (id: string) => {
    const newRules = rules.filter((rule) => rule.id !== id);
    setRules([...newRules]);
    if (newRules.length === 0) {
        setDisableButton(false)
    } else {
      const filled = newRules.every((rule) => rule.value.trim() !== "");
      setDisableButton(!filled);
    }
  };

  const checkRulesChanged = (rules) => {
    // Check if lengths are different
    if (community?.rules.length !== rules.length) {
      return true;
    }

    // Compare each element
    for (let i = 0; i < community?.rules.length; i++) {
      if (community?.rules[i] !== rules[i]) {
        return true;
      }
    }

    // If no differences found
    return false;
  };

  const handleUpdateCommunity = () => {
    const rulesArray = rules.map((rule) => rule.value);
    // now check if at least a single field has changed.
    const nameChanged = community?.name !== name;
    const descriptionChanged = community?.description !== description;
    const imageChanged = community?.image !== image;
    const coverImageChanged = community?.coverImage !== coverImage;
    const rulesChanged = checkRulesChanged(rulesArray);

    if (
      nameChanged ||
      descriptionChanged ||
      imageChanged ||
      coverImageChanged ||
      rulesChanged
    ) {
      // update community

      updateCommunityMutation.mutate({
        name,
        description,
        rules: rulesArray,
        image,
        coverImage,
      });
    } else {
      toast.error("No changes detected");
    }
  };

  return (
    <div>
      {userId === community?.creator?._id && (
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-0 z-[1] right-0 mr-3 mt-3 border border-white px-5 py-1 rounded-md"
        >
          Edit
        </button>
      )}

      {/* show edit modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className={` fixed top-0 left-0 z-20 w-full backdrop-blur-sm bg-white/30 dark:bg-black/30 h-[100vh] `}
          >
            <div className="flex flex-col  items-center space-y-4 p-6 w-full max-w-[800px] mx-auto border border-gray-800 mt-5 rounded-md h-[90vh] overflow-y-auto no-scrollbar">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium ">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleInputChange()
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
                  //   defaultValue={community?.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    handleInputChange()
                  }}
                  className="w-full px-3 py-2 border border-gray-700 bg-transparent text-white rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* upload image for community */}

              <CommunityImage image={image} setImage={setImage} />

              <CommunityCoverImage
                coverImage={coverImage}
                setCoverImage={setCoverImage}
              />

              {/* rules section */}

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
                        // value={rule.value}
                        defaultValue={rule.value}
                        onChange={(e) => {
                          handleRuleChange(rule.id, e.target.value);
                          handleInputChange()
                        }}
                        className="relative w-full px-3 py-2 border border-gray-700 bg-transparent rounded focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => handleRemoveRule(rule.id)}
                        className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 transition-all h-full z-40 rounded-tr-md rounded-br-md px-4"
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
                  onClick={handleUpdateCommunity}
                  disabled={updateCommunityMutation.isPending || disableButton}
                  className={`px-4 py-2 bg-green-500 text-white rounded-tr-md rounded-br-md  ${
                    updateCommunityMutation.isPending || disableButton
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
                >
                  {updateCommunityMutation.isPending ? (
                    <span className="flex items-center gap-1">
                      Updating...{" "}
                      <span className="inline-block size-5 border border-t-transparent rounded-full animate-spin"></span>
                    </span>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityEditModal;
