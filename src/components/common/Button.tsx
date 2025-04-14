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
    <div className="relative inline-block">
      {/* Gradient border background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #D5CDFF, #AF9EFF)",
          borderRadius: "8px",
        }}
      ></div>

      {/* Inner button with background color */}
      <button
        onClick={onClick}
        className={`relative flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white bg-primary transition-all duration-300 hover:bg-primary-hover cursor-pointer m-[1px] ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="font-medium">{children}</span>
        <span className="relative size-5 overflow-hidden flex items-center justify-center">
          <span
            className={`${isHovered ? "animate-diagonalCircle" : ""} absolute`}
          >
            {icon}
          </span>
        </span>
      </button>
    </div>
  );
};

export { Button, DiagonalCircularButton };
