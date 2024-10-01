import { useScroll, useTransform, motion } from "framer-motion";
import  { useRef } from "react";
import TopBloggers from "./TopBloggers";

const SecondSection = () => {
  const sentence =
    "A social media with unique foundations True Ownership. Create Your own community and engage with like minded people. Browse any category and find your content. Share and connect. ";
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.7", "start start"],
  });
  const { scrollYProgress:imagescroll } = useScroll({
    target: container,
    offset: ["0.2 end", "end start"],
  });
  const totalCharacters = sentence.length;

  return (
    <div
      ref={container}
      className="min-h-[100vh] bg-white dark:bg-gray-800 z-10 relative p-5 "
    >
      <div className="max-w-[1001px] m-auto">
        <p className="flex flex-wrap mt-[80px] text-4xl text-center">
          {sentence.split("").map((word, index) => {
            const start = index / totalCharacters; // Start based on the position in the string
            const end = (index + 1) / totalCharacters;
            return (
              <Letter
                key={index}
                range={[start, end]}
                progress={scrollYProgress}
              >
                {word === " " ? "\u00A0" : word}
              </Letter>
            );
          })}
        </p>

        {/* top blogger section */}
        <div className="mt-[60px]">

        <TopBloggers scrollYProgress={imagescroll} />
        </div>
      </div>
    </div>
  );
};

export default SecondSection;

const Letter = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span>
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="">
        {children}
      </motion.span>
    </span>
  );
};
