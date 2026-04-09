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

  const logoUrl = "/logo.png";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex items-center justify-center overflow-hidden", className)}
    >
      <img 
        src={logoUrl}
        alt="Jay's Web Design Services" 
        className={cn("w-auto h-auto max-w-full max-h-full object-contain", sizes[size])}
        onError={(e) => {
          // Fallback if image fails to load
          const target = e.currentTarget;
          target.style.display = 'none';
          const fallback = document.createElement('span');
          fallback.className = "font-black tracking-tighter uppercase italic text-blue-600 whitespace-nowrap";
          fallback.innerHTML = `Jay's <span class="text-black">Web Design</span>`;
          if (target.parentElement) {
            target.parentElement.appendChild(fallback);
          }
        }}
      />
    </motion.div>
  );
}
