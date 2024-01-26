import React, { useState, useCallback, useRef, useLayoutEffect, useEffect } from "react";
import { measureDomNode } from "utils/dom";

interface Proptypes {
  fold: boolean;
  children: React.ReactNode;
}

const TransitionCollapseItem = ({ children, fold }: Proptypes) => {
  const [height, setHeight] = useState(0);
  const [displayToDom, setDisplayToDom] = useState(false);
  const ref = useRef<HTMLDivElement>();

  const refCallback = useCallback((element: HTMLDivElement) => {
    ref.current = element;
    getElementHeight();
  }, []);

  // Whenever screen size changes we need to remeasure elements
  useLayoutEffect(() => {
    window.addEventListener("resize", getElementHeight);
    return () => window.removeEventListener("resize", getElementHeight);
  }, [fold]);

  // Wait for collapse transition to end before removing children from the DOM
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const onTransitionEnd = () => {
      if (!fold) return;
      setDisplayToDom(false);
    };
    element.addEventListener("transitionend", onTransitionEnd);
    return () => {
      element.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [fold]);

  // Whenever fold state changes to true, display children to DOM
  useEffect(() => {
    if (fold) return;
    setDisplayToDom(true);
  }, [fold]);

  // Whenever displayToDom state changes to true, get and set the element height again as it is being newly painted to the DOM again
  useLayoutEffect(() => {
    if (!displayToDom) return;
    getElementHeight();
  }, [displayToDom]);

  function getElementHeight() {
    if (!ref || !ref.current) return;
    const setElementStyle = (e: HTMLElement) => {
      e.style.height = "auto";
      e.style.width = (ref.current?.clientWidth || 0) + "px";
      return e;
    };
    const { height } = measureDomNode(ref.current!, setElementStyle);
    setHeight(height);
  }

  return (
    <div
      ref={refCallback}
      style={{
        height: fold ? 0 : height,
        overflow: "hidden",
        transition: "all 400ms",
      }}
    >
      {displayToDom && children}
    </div>
  );
};

export default TransitionCollapseItem;
