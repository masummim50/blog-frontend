import { motion, useTransform } from "framer-motion";
import MagnetWrapper from "./MagnetWrapper";

const FirstSection = ({ scrollYProgress }) => {
  const head = "Write Wave";
  const scale = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className={`bg-[url(/pattern.png)] min-h-[100vh] w-full font-mono sticky z-[0] top-[75px] left-0`}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[60px] md:text-[90px] lg:text-[120px] text-center text-black dark:text-white "
      >
        {head.split("").map((letter, index) => (
          <motion.span
            className={`${
              index === 0 || index === 6
                ? "text-yellow-500 dark:text-yellow-400"
                : ""
            } inline-block`}
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h2>
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[25px] md:text-[37px] lg:text-[50px] text-center"
      >
        Catch the{" "}
        <span className=" text-yellow-500 dark:text-yellow-400">
          Wave of Ideas
        </span>
        – Write, Share, Inspire
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center items-center mt-14 gap-1 origin-center"
      >
        <MagnetWrapper>
          <button className="rounded-md  border-yellow-400 bg-yellow-500 text-white px-5 py-2 backdrop-blur-sm border inline-block">
            How It Works
          </button>
        </MagnetWrapper>
        <MagnetWrapper>
          <button className="rounded-md text-yellow-400 border-yellow-400  px-5 py-2 backdrop-blur-sm border">
            Join Now
          </button>
        </MagnetWrapper>
      </motion.div>
    </motion.div>
  );
};

export default FirstSection;
