import { MouseEventHandler } from "react";
import Image from "next/image";

type props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
};
const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  type,
  bgColor,
  textColor,
}: props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 rounded-xl font-bold max-md:w-full ${
        isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-slate-500"
      }
      ${textColor ? textColor : "text-white"}`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt="left" />}
    </button>
  );
};

export default Button;
