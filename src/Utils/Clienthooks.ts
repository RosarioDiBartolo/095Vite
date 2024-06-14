"use client";
import { DependencyList, useEffect } from "react";



export const useListener = (
  type: string,
  callback: EventListenerOrEventListenerObject,
  node?: Element,
  deps?: DependencyList 
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
