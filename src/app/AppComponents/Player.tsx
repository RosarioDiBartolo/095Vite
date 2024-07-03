"use client";
import   { ChangeEvent, useCallback, useEffect, useRef  } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { useAudioTime } from '../../Utils/AudioUtils';
import { useGlobal } from '../AlbumProvider';
import { PercentageGradient, formatTime } from '../../Utils/General';
import Heart from "../Widgets/Heart";
import lottie, { AnimationItem } from 'lottie-web';
 
import animationData from "../../assets/Animation - 1718204813124.json"
import Toggler from '../Widgets/Toggler';
import { RiForwardEndFill } from 'react-icons/ri';
import classNames from 'classnames';
import { motion } from 'framer-motion';
 

export function MusicTrack() {
  const player = useGlobalAudioPlayer();
  const currentTime = useAudioTime(player);
  const { duration, seek } = player;

  const percentage = Math.round(currentTime /  duration  * 100)
  const bgImage =  PercentageGradient({percentage, color1: '#10b981'}) 
  console.log(bgImage)
  const handleSeek = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  }, [seek]);

  return (
    <div className="portrait:pb-10 flex-1">
      <div className="flex justify-between text-sm mt-2 text-gray-500">
        <span>{currentTime ? formatTime(currentTime) : '0:00'}</span>
        <span>{duration ? formatTime(duration) : '0:00'}</span>
      </div>
      <motion.input
      style = {{
        backgroundImage: bgImage

      }}
        type="range"
        className="w-full h-1 appearance-none     border-none  rounded-lg   cursor-pointer range-sm dark:bg-zinc-900  "        min="0"
        max={duration || 0}
        step={.0001}
        value={currentTime || 0}
        onChange={handleSeek}
      />

     
    </div>
  );
} 
const Player = () => {
   const { album, setCurrentSong, currentSongIndex , getColor } = useGlobal();
     
  const nextSong = useCallback(() => {
    setCurrentSong( prev => prev < album.Songs.length - 1? prev + 1 : 0)
  }, [album?.Songs.length, setCurrentSong])
  const animationContainer = useRef< HTMLDivElement >(null);
  const animationInstance = useRef<AnimationItem>(null)  
  useEffect(() => {
     (animationInstance.current  as unknown) = lottie.loadAnimation({
      container: (animationContainer.current as HTMLDivElement),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationData,
    });
   
    return () => {
       animationInstance.current?.destroy();
    };
   
  }, [animationData]);
 

  const shuffle = useCallback(() => {
    if (animationInstance.current) {
      animationInstance.current.goToAndPlay(0, true);
    }
    let idx = currentSongIndex;
    while (idx == currentSongIndex){
      idx = Math.floor(Math.random() * (album?.Songs.length || 0))
    }
    setCurrentSong( idx );
  }, [album?.Songs.length, setCurrentSong])
  const Color = getColor({"text": 500})
  return (
    <div className=' flex justify-between items-center z-10   green'> 
    <div className={classNames(" w-1/2 flex gap-3 items-end justify-between", ...Color)}>
          <Toggler />
          
         <RiForwardEndFill onClick={nextSong} className="    transition-transform duration-75 ease-in   active:text-white"
          size={48}
          aria-label="forwards song" />
          <Heart />
           
    </div>
    <div>

    <div onClick={shuffle} ref={ animationContainer } className=' relative bottom-3 w-24 rotate-180 ' /> 
    </div> 
    </div>

  );
};
 

export default Player;
 

