"use client";
import { ReactNode, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  diagonalEffect?: boolean;
  diagonalIcon: ReactNode;
  variant: "primary" | "outline";
};

const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

type DiagonalCircularButtonProps = {
  children: ReactNode;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
};

const DiagonalCircularButton = ({
  children,
  icon,
  className,
  onClick,
}: DiagonalCircularButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#91E4B5] transition-all duration-300 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        background: "transparent",
        borderRadius: "8px",
      }}
    >
      {/* Pseudo-element for gradient border */}
      <div
        style={{
          content: "",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "8px",
          padding: "2px",
          background: "linear-gradient(90deg,#017340, #B1FDCF)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />
      <span className="font-medium">{children}</span>
      <span className="relative size-5 overflow-hidden flex items-center justify-center">
        <span
          className={`${isHovered ? "animate-diagonalCircle" : ""} absolute`}
        >
          {icon}
        </span>
      </span>
    </button>
  );
};

export { Button, DiagonalCircularButton };
