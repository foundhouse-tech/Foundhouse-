"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

/** Scroll-in fade-up used on every section (matches the original site's motion). */
export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** On-load fade-up for the hero. */
export function HeroItem({
  children,
  delay = 0,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Slow drift for the hero glow. */
export function HeroGlow() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[-18%] h-140 w-225 -translate-x-1/2 rounded-full bg-gold/25 blur-[150px]"
      animate={{ x: ["-50%", "-46%", "-50%"] }}
      transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
    />
  );
}

/** Hover lift on primary buttons (the original wraps CTAs in a focusable motion div). */
export function Tap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div tabIndex={0} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      {children}
    </motion.div>
  );
}
