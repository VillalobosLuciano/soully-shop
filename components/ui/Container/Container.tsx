import { ReactNode, FC, ComponentType, HTMLAttributes } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  el?: ComponentType<HTMLAttributes<HTMLElement>>;
}

const Container: FC<Props> = ({ children, el: Component = "div" }) => {
  return (
    <Component className="pt-16 mx-auto lg:pt-24 max-w-8xl">
      {children}
    </Component>
  );
};

export default Container;
