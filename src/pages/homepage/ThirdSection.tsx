import { useScroll, motion, useTransform } from "framer-motion";
import {  useRef } from "react";

const blogCards = [
  {
    color: "bg-teal-300 dark:bg-teal-600",
    title: "Content",
    img: "/card0.png",
    content:
      "Discover the latest trends, tips, and techniques to create compelling content that captivates your audience.",
  },
  {
    color: "bg-violet-300 dark:bg-violet-600",
    title: "Communities",
    img: "/card1.png",
    content:
      "Connect with writers, share your work, and join thriving communities where creativity flourishes.",
  },
  {
    color: "bg-amber-300 dark:bg-amber-600",
    title: "Connection",
    img: "/card2.png",
    content:
      "Build strong relationships with like-minded individuals who share your passion for writing and storytelling.",
  },
  {
    color: "bg-emerald-300 dark:bg-emerald-600",
    title: "Explore",
    img: "/card3.png",
    content:
      "Dive into a world of inspiration and explore new writing styles, genres, and topics to broaden your horizons.",
  },
];

const ThirdSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });



  return (
    <div ref={container} className="bg-white dark:bg-gray-800 relative z-10">
      {blogCards.map((card, index) => {
        const targetScale = 1- ((blogCards.length - index) * 0.05);
        return <Card
          key={index}
          card={card}
          scrollYProgress={scrollYProgress}
          range={[index*0.2,1]}
          index={index}
          targetScale={targetScale}
        />
})}
    </div>
  );
};

export default ThirdSection;

const Card = ({ card, scrollYProgress, range , index, targetScale}) => {
  const scale = useTransform(scrollYProgress, range, [1, targetScale]);
  return (
    <div className={`h-[100vh] sticky top-0  pt-[100px] `}>
      <motion.div style={{ top: index * 25, scale  }} className={`flex flex-col items-center justify-center gap-2 py-3 max-w-[600px] m-auto rounded-md relative ${card.color}`}>
        <img src={card.img} alt={card.title} className="w-[30vw] h-[40vh]" />
        <h2 className="text-3xl font-bold">{card.title}</h2>
        <p className="text-lg text-center">{card.content}</p>
      </motion.div>
    </div>
  );
};
