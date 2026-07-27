"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65, delay, ease: [.21, .8, .3, 1] }}>
      {children}
    </motion.div>
  );
}
