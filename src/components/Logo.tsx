import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  light?: boolean;
}

export default function Logo({ className, size = "md", light = false }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-5xl md:text-7xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "font-black tracking-tighter uppercase italic flex items-center",
        sizes[size],
        light ? "text-white" : "text-blue-600",
        className
      )}
    >
      Jay's <span className={cn("ml-1", light ? "text-blue-400" : "text-black")}>Web Design</span>
    </motion.div>
  );
}
