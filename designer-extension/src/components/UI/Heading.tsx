import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ level, children, className }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const defaultClassName = twMerge(
    clsx(
      {
        "text-4xl mb-2": level === 1,
        "text-2xl font-bold": level === 2,
        "text-lg": level === 3,
        "text-md": level === 4,
        "text-sm": level === 5,
        "text-xs": level === 6,
      },
      className
    )
  );
  return <Tag className={defaultClassName}>{children}</Tag>;
};

export default Heading;
