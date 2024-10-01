import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  const container = useRef(null);

  const {scrollYProgress} = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // const scalex = useTransform(scrollYProgress, [0,1], ['0%', '100%'])
  

  return (
    <div ref={container} className="pt-5 relative">
      {/* <motion.div style={{width: scalex}} className={`bg-orange-400 h-1 w-5 sticky top-[65px] left-0 z-[100]`}></motion.div> */}
      <FirstSection scrollYProgress={scrollYProgress}/>
      <SecondSection />
      {/* <div className="h-[100vh] bg-teal-300 relative z-10"></div> */}
      <ThirdSection/>
      {/* <div className="h-[100vh] bg-violet-300 relative z-10"></div> */}
      <FourthSection/>
      <div className="h-[50vh] bg-white dark:bg-gray-900 relative z-10"></div>
    </div>
  );
};

export default HomePage;
