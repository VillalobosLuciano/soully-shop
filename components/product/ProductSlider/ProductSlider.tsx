import React, { FC, Children, isValidElement, useState } from "react";
import s from "./ProductSlider.module.css";
import { useKeenSlider } from "keen-slider/react";
import cn from "classnames";

const ProductSlider: FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const slides = instanceRef.current?.track.details.slides;

  return (
    <div className={s.root}>
      <div ref={sliderRef} className="h-full transition-opacity keen-slider">
        {loaded && instanceRef.current && (
          <>
            <button
              onClick={instanceRef.current?.prev}
              className={cn(s.leftControl, s.control)}
            />
            <button
              onClick={instanceRef.current?.next}
              className={cn(s.rightControl, s.control)}
            />

            <div className={s.dots}>
              {slides?.map((slide, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(index);
                    }}
                    className={
                      currentSlide === index ? `${s.dotActive}` : `${s.dot}`
                    }
                  ></button>
                );
              })}
            </div>
          </>
        )}
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className}` : ""
                } keen-slider__slide`,
              },
            };
          }

          return child;
        })}
      </div>
    </div>
  );
};

export default ProductSlider;
