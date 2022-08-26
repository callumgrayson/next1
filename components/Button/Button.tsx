import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  handler?: () => void;
  children: React.ReactNode;
  tw?: string;
};

export default function Button({
  handler,
  children,
  tw,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={handler}
      className={`bg-slate-200 border border-solid border-slate-300 py-4px px-2 rounded ${tw}`}
    >
      {children}
    </button>
  );
}
