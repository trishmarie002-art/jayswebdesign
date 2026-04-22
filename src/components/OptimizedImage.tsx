import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  onLoad?: () => void;
}

/**
 * OptimizedImage component with lazy loading, blur placeholder, and responsive sizing.
 * Uses Intersection Observer for efficient lazy loading.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
  objectFit = "cover",
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px 0px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Generate optimized URL for Unsplash images
  const getOptimizedSrc = (originalSrc: string, targetWidth?: number): string => {
    // For Unsplash images, adjust quality and size parameters
    if (originalSrc.includes("unsplash.com")) {
      const url = new URL(originalSrc);
      url.searchParams.set("q", "75"); // Good quality with compression
      url.searchParams.set("auto", "format"); // Auto WebP/AVIF
      if (targetWidth) {
        url.searchParams.set("w", String(targetWidth));
      }
      return url.toString();
    }
    return originalSrc;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (originalSrc: string): string | undefined => {
    if (!originalSrc.includes("unsplash.com") && !originalSrc.includes("pravatar.cc")) {
      return undefined;
    }

    const widths = [320, 640, 768, 1024, 1280, 1920];
    
    if (originalSrc.includes("unsplash.com")) {
      return widths
        .map((w) => `${getOptimizedSrc(originalSrc, w)} ${w}w`)
        .join(", ");
    }

    return undefined;
  };

  const objectFitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
  }[objectFit];

  return (
    <div
      ref={imgRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "auto" }}
    >
      {/* Blur placeholder / skeleton */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: hasError ? undefined : "linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          src={getOptimizedSrc(src, width)}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
          referrerPolicy="no-referrer"
          className={cn(
            "w-full h-full transition-opacity duration-500",
            objectFitClass,
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
