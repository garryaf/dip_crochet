import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ size = "md" }: BrandLogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };
  
  return (
    <span className={`${sizes[size]} font-black tracking-tight select-none`}>
      <span className="text-foreground">dip</span>
      <span className="text-primary">.</span>
      <span className="text-foreground italic font-light">crochet</span>
    </span>
  );
}
