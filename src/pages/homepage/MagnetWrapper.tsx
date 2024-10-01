import React, { MouseEvent, useRef } from "react";
import { motion } from "framer-motion";

const MagnetWrapper = ({ children }) => {
  const btnref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const mouseMove = (e:MouseEvent) => {
    if(btnref && btnref.current){

      const { clientX, clientY } = e;
      const { width, height, left, top } = btnref.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x, y });
    }
  };
  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  const { x, y } = position;
  return (
    <motion.div
      ref={btnref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x: x, y: y }}
      transition={{ type: "spring", stiffness: 100, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default MagnetWrapper;
