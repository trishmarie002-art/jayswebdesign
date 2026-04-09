import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  light?: boolean;
}

export default function Logo({ className, size = "md", light = false }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    sm: "h-10 md:h-12",
    md: "h-16 md:h-20",
    lg: "h-32 md:h-44",
    xl: "h-48 md:h-64",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex items-center justify-center", className)}
    >
      {!imageError ? (
        <img 
          src="/logo.png" 
          alt="Jay's Web Design Services" 
          className={cn(
            "w-auto h-auto max-w-full max-h-full object-contain drop-shadow-2xl", 
            sizes[size]
          )}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={cn(
          "font-display font-black tracking-tighter uppercase italic flex flex-col items-center leading-none",
          textSizes[size],
          light ? "text-white" : "text-blue-600"
        )}>
          <span className="flex items-center">
            JAY'S
          </span>
          <span className={cn(
            "text-[0.45em] tracking-[0.2em] not-italic font-bold -mt-1",
            light ? "text-blue-400" : "text-black"
          )}>
            WEB DESIGN SERVICES
          </span>
        </div>
      )}
    </motion.div>
  );
}
