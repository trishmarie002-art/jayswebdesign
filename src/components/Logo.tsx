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
    sm: "h-12 md:h-16",
    md: "h-24 md:h-32",
    lg: "h-36 md:h-48",
    xl: "h-52 md:h-72",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-7xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex items-center justify-center shrink-0", className)}
    >
      {!imageError ? (
        <img 
          src="https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay's%20Web%20Design%20Services/jayswebdesignserviceslogo.png" 
          alt="Jay's Web Design Services" 
          className={cn(
            "w-auto max-w-full object-contain drop-shadow-2xl transition-all duration-300", 
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
