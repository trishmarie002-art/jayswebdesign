import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  light?: boolean;
}

export default function Logo({ className, size = "md", light = false }: LogoProps) {
  const sizes = {
    sm: "h-10 md:h-12",
    md: "h-16 md:h-20",
    lg: "h-32 md:h-44",
    xl: "h-48 md:h-64",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex items-center", className)}
    >
      <img 
        src="/logo.png" 
        alt="Jay's Web Design Services" 
        className={cn("w-auto object-contain", sizes[size])}
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}
