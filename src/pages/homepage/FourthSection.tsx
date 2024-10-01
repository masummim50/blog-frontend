import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const cats = [
  { title: "tech", image: "/tech.jpg" },
  { title: "diy", image: "/diy.jpg" },
  { title: "fashion", image: "/fashion.jpg" },
  { title: "finance", image: "/finance.jpg" },
  { title: "art", image: "/art.jpg" },
  { title: "food", image: "/food.jpg" },
  { title: "lifestyle", image: "/lifestyle.jpg" },
  { title: "travel", image: "/travel.jpg" },
  { title: "photography", image: "/photography.jpg" },
];

const FourthSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={container}
      className="w-full min-h-[100vh] bg-white dark:bg-gray-900 z-10 relative pb-16"
    >
      <h2 className="text-3xl font-semibold text-center pt-16">Categories</h2>
      <p className="text-center pb-16">Blog about anything and everything</p>
      <div className="grid grid-cols-3 max-w-[1100px] m-auto px-2 gap-2">
        {cats.map((cat, index) => (
          <Container key={index} cat={cat} index={index} scrollYProgress={scrollYProgress}/>
        ))}
      </div>
    </div>
  );
};

export default FourthSection;

const Container = ({ cat, index, scrollYProgress }) => {
  
  return (
    <motion.div
      
      key={index}
      className=" bg-violet-300 relative z-10 h-[100px] md:h-[150px] lg:h-[200px] rounded-md overflow-hidden"
    >
      <Image
        image={cat.image}
        alt={cat.title}
        scrollYProgress={scrollYProgress}
        index={index}
      />
      <motion.div
        key={index}
        className="absolute bg-black/30 top-0 left-0 w-full h-full flex items-center justify-center text-white text-xl font-bold"
      >
        {cat.title.toUpperCase()}
      </motion.div>
    </motion.div>
  );
};

const Image = ({ image, alt, scrollYProgress, index }) => {
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, index === 4 ? 4.5 : 2]
  );
  return (
    <motion.img
      style={{ scale }}
      src={image}
      alt={alt}
      className="w-full h-full object-cover"
    />
  );
};
