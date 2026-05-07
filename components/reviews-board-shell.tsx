"use client";

import { motion } from "motion/react";

export function ReviewsBoardShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex w-full flex-1 flex-col"
    >
      {children}
    </motion.section>
  );
}
