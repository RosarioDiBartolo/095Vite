"use client";
import { DependencyList, useEffect, useState  } from "react";

interface EventListener  {
  type: string;
  callback: EventListenerOrEventListenerObject;
  node?: Element;
}
 
export const useListener = (
  {type, callback , node  , deps }: EventListener &  {deps?: DependencyList }
) => {
    const Node = node || (typeof window !== 'undefined' ? window : undefined);

  useEffect(() => {
 
    if (Node) {
      Node.addEventListener(type, callback);

      // Remove event listener on cleanup
      return () => {
        Node.removeEventListener(type, callback);
      };
    }
    // Add event listener
  }, [Node, callback, type, ...(deps || [])]);
};
export const useScrollDelta = () => {
  const [Delta, setDelta] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > 0) {
      setDelta(lastScrollTop - currentScrollTop);
      setLastScrollTop(currentScrollTop);


    }

  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return Delta;
};
