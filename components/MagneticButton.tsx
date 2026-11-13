"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function MagneticButton({
  children = "Start learning",
  onClick,
  href,
  className = "",
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 180, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Magnetic pull distance capped
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "group inline-flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-label font-bold rounded-sm border transition-colors select-none";

  const variantStyles =
    variant === "primary"
      ? "bg-on-ink text-ink border-on-ink hover:bg-transparent hover:text-on-ink"
      : variant === "outline"
      ? "bg-transparent text-primary border-primary hover:bg-primary hover:text-on-ink"
      : "bg-primary text-on-ink border-primary hover:bg-primary-container";

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className="inline-block cursor-pointer"
    >
      <div className={`${baseStyles} ${variantStyles} ${className}`}>
        <span>{children}</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return <div onClick={onClick}>{content}</div>;
}

