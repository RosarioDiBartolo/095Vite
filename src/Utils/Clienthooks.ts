"use client";
import { DependencyList, useEffect  } from "react";

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
