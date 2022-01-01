import { FC } from "react";
import s from "./Swatch.module.css";
import { Check } from "@components/icons";
import cn from "classnames";
import { isDark } from "@lib/color";

interface Props {
  size?: "sm" | "md" | "lg";
  color?: string;
  net?: string;
  type?: string;
  label?: string;
  active?: boolean;
  variant?: "size" | "color" | "net" | "type" | string;
  onClick: () => void;
}

const Swatch: FC<Props> = ({
  color,
  net,
  type,
  label,
  variant,
  active,
  size = "md",
  ...rest
}) => {
  label = label?.toLowerCase();
  variant = variant?.toLocaleLowerCase();

  const rootClassName = cn(s.root, {
    [s.active]: active,
    [s.color]: color,
    [s.net]: variant === "net",
    [s.type]: variant === "type",
    [s.size]: variant === "size",
    [s.dark]: color && isDark(color),
    [s.sm]: size === "sm",
  });

  return (
    <button
      style={color ? { backgroundColor: color } : {}}
      className={rootClassName}
      {...rest}
    >
      {variant === "color" && active && (
        <span>
          <Check />
        </span>
      )}
      {variant === "size" ? label : null}
      {variant === "net" ? label : null}
      {variant === "type" ? label : null}
    </button>
  );
};

export default Swatch;
