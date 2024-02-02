import { SVGAttributes } from "react";

export type IconProps = {
  size?: number;
} & SVGAttributes<SVGElement>;

export const Icon = (path: React.ReactNode) => {
  const SVGIcon = ({ size, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={size}
      width={size}
      {...props}
    >
      {path}
    </svg>
  );

  return SVGIcon;
};
