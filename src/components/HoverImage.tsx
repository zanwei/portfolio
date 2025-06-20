"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HoverImageProps {
  src: string;
  x: number;
  y: number;
  visible: boolean;
}

const HoverImage = ({ src, x, y, visible }: HoverImageProps) => {
  return (
    <motion.div
      className="pointer-events-none fixed z-50 overflow-hidden rounded-lg"
      style={{
        width: 80,
        height: 'auto',
        left: x + 8,
        top: y + 8,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.95,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.1,
      }}
    >
      {src && <Image src={src} alt="Hovered Image" width={80} height={60} style={{ width: '100%', height: 'auto' }} />}
    </motion.div>
  );
};

export default HoverImage; 