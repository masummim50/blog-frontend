
import { AnimatePresence, motion } from "framer-motion";

const RulesModal = ({ showModal, setShowModal, rules }: { showModal: boolean, setShowModal: any, rules: string[] }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className={`  flex justify-center items-center min-h-[100vh] w-full fixed  top-0 left-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-sm text-black dark:text-white `}
        >
          <div className=" p-6 w-full max-w-[800px] mx-auto border border-gray-800 rounded-md h-[90vh] overflow-y-auto no-scrollbar">

            <div className="pt-5">
                <div className="text-right w-full">
                    <button className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>Close</button>
                </div>
                {
                    rules.length === 0 && <p>No rules have been added to this community</p>
                }
                <div>
                    {
                        rules.map((rule, index) => (
                            <li key={index}>{rule}</li>
                        ))
                    }
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RulesModal;
