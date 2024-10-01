
import { motion, useTransform } from "framer-motion";

const TopBloggers = ({ scrollYProgress }) => {
  const x = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const other = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  return (
    <div>
        <h2 className="text-4xl my-3  text-center text-yellow-500 dark:text-yellow-400">Top Bloggers</h2>
      <div className="overflow-hidden w-full">
        <motion.div
          style={{ x }}
          className="first flex gap-2 overflow-hidden w-[200%] flex-nowrap relative"
        >
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div className="container rounded-md overflow-hidden h-[150px] w-[200px] flex-shrink-0">
                <motion.img
                  className="h-full w-full relative "
                  src={`/game/${index}.jpg`}
                  alt=""
                />
              </div>
            ))}
        </motion.div>
      </div>

      <div className="overflow-hidden w-full mt-[50px]">
        <motion.div
          style={{ x: other }}
          className="first flex flex-end gap-2 overflow-hidden w-[150%] flex-nowrap relative"
        >
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div className="container rounded-md overflow-hidden h-[150px] w-[200px] flex-shrink-0">
                <img
                  className="w-full h-full"
                  src={`/game/${index+8}.jpg`}
                  alt=""
                />
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopBloggers;
