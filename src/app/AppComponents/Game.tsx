"use client";

import React, {    useEffect, useRef, useState } from 'react';
import { useApp } from '../AppProvider';
import classNames from 'classnames';
import lottie, { AnimationItem } from 'lottie-web';
import PhoneRotation from '../../assets/Phone rotation.json';
import { motion } from 'framer-motion';
 

declare global {
  interface Window { 
    Progress: (progress: number) => void

   }
}
const Game: React.FC = () => {
  const [gameOpened ] = useApp().game;
  const [isActive, setIsActive] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const animationInstanceRef = useRef<AnimationItem | null>(null);
  const [Progress, setProgress] = useState(0)
  
  window["Progress"] = (progress: number)=>{
    setProgress(progress)
  }
  useEffect(() => {

     

    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'up') {
        setIsActive( false)
      }
      else{
        setIsActive( true)

      }
    };
     window.addEventListener('message', handleMessage);

     const callback = ( )=>{
         setIsActive( true )
     }
     iframeRef.current?.contentWindow?.addEventListener("click", callback)
 
     return ()=>{
      window.removeEventListener('message', handleMessage);

      iframeRef.current?.contentWindow?.removeEventListener("click", callback)
    }
  }, []);

 

  useEffect(() => {
    if (gameOpened && animationContainerRef.current) {
      animationInstanceRef.current = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: PhoneRotation,
      });

      return () => {
        animationInstanceRef.current?.destroy();
      };
    }
  }, [gameOpened]);

   
  return (
    gameOpened && (
      <div
      
      onClick={ ()=> setIsActive(false)}
         className={classNames('flex relative flex-col landscape:h-[90svh] transition-max-height duration-500 ease-linear   ',{ "max-h-[3000px]": isActive, " blur-sm": ! isActive} )}
      >
         
        <iframe
          ref={iframeRef}
          title="Game"
            onWheel={  (event) => {
            window.scrollBy({
                top: event.deltaY,
                behavior: 'smooth'
            }) }}
            scrolling="no"
          className={classNames(
            'portrait:hidden relative   transition-all duration-500 delay-200  border-none flex-1 w-full h-full',
           )}
          src="/javascript-racer-master/v4.final.html"
        />
        <div className="z-0 p-4 sticky bg-gradient-to-t from-green-800   font-extrabold h-80 flex items-center justify-center flex-col text-center landscape:hidden">
          <div ref={animationContainerRef} />
        </div>

        <motion.div animate={{
          transition: {
            ease: "easeInOut"
          },
          width: Progress * 100 + "%",
          opacity : Progress == 1? 0 : 100
        }} className=' py-[1px] bg-green-500'>

        </motion.div>
      </div>
    )
  );
};

export default Game;
