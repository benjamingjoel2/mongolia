"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

/** Fade-and-rise on scroll into view, matching the reference's slow .8s entrance. */
export function Reveal({
  delay = 0,
  y = 48,
  once = true,
  className,
  children,
  ...rest
}: { delay?: number; y?: number; once?: boolean } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
