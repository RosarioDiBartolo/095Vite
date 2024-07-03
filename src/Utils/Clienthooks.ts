"use client";
import {  useEffect, useState  } from "react";
export const useScroll = ()=>{
  const [Scroll, setScroll] = useState(0)
  useEffect(
    ()=>{
    const onScroll = ()=>{
      setScroll(window.scrollY)
    }

    window.addEventListener("scroll", onScroll)

    return ()=> window.removeEventListener( "scroll", onScroll)
    }
  )
  return Scroll;
 }

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
