"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../AppProvider';
import classNames from 'classnames';
import lottie, { AnimationItem } from 'lottie-web';
 import PhoneRotation from "../../assets/Phone rotation.json"
const Game: React.FC = () => {
  const [gameOpened] = useApp().game;
   const [Active, setActive] = useState(false)

   const animationContainer = useRef< HTMLDivElement >(null);
   const animationInstance = useRef<AnimationItem>(null)   
    
   useEffect(() => {
    if (gameOpened){
      (animationInstance.current  as unknown) = lottie.loadAnimation({
       container: (animationContainer.current as HTMLDivElement),
       renderer: 'svg',
       loop: true,
       autoplay: true,
       animationData: PhoneRotation,
     });
    
     return () => {
        animationInstance.current?.destroy();
     };
    }
   }, [PhoneRotation, gameOpened]);



  return (
    gameOpened &&
    <div         onDoubleClickCapture={()=> setActive(!Active)}
    className={ classNames( 'landscape:h-[90svh] flex flex-col relative'  )}> 
       <iframe
         title='Game'
        className={classNames(
          "portrait:hidden transition-all duration-500 delay-200 inset-0 border-none flex-1 w-full h-full  ",
          { "scale-0 hidden": !gameOpened, "scale-100 block": gameOpened }
        )}
        src="/javascript-racer-master/v4.final.html"
      />
      <div className=' z-0 p-4 bg-gradient-to-t from-green-700   font-extrabold h-80 flex items-center justify-center flex-col text-center landscape:hidden'>
         
        <div ref={ animationContainer} />
      </div>
    </div>
  );
};

export default Game;
