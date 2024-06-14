"use client";
import   { ChangeEvent, useCallback, useEffect, useRef  } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { useAudioTime } from '../../Utils/AudioUtils';
import { useGlobal } from '../AlbumProvider';
import { formatTime } from '../../Utils/General';
import Heart from './Heart';
import lottie, { AnimationItem } from 'lottie-web';
 
import animationData from "../../assets/Animation - 1718204813124.json"
import Toggler from '../Toggler';
import { RiForwardEndFill } from 'react-icons/ri';
 

export function MusicTrack() {
  const player = useGlobalAudioPlayer();
  const currentTime = useAudioTime(player);
  const { duration, seek } = player;

  const handleSeek = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  }, [seek]);

  return (
    <div className="portrait:pb-10 flex-1">
        <div className="flex justify-between text-sm mt-2 text-gray-500">
        <span>{currentTime ? formatTime(currentTime) : '0:00'}</span>
        <span>{duration ? formatTime(duration) : '0:00'}</span>
      </div>
      <input
        type="range"
        className="w-full h-1 appearance-none accent-green-700 border-none  rounded-lg   cursor-pointer range-sm dark:bg-zinc-900  "        min="0"
        max={duration || 0}
        value={currentTime || 0}
        onChange={handleSeek}
      />

     
    </div>
  );
} 
const Player = () => {
   const { album, setCurrentSong  } = useGlobal();
   const animationContainer = useRef< HTMLDivElement >(null);
  const animationInstance = useRef<AnimationItem>(null)   
  const nextSong = useCallback(() => {
    setCurrentSong( prev => prev < album.Songs.length - 1? prev + 1 : 0)
  }, [album?.Songs.length, setCurrentSong])
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
    setCurrentSong(Math.floor(Math.random() * (album?.Songs.length || 0)));
  }, [album?.Songs.length, setCurrentSong])
 
  return (
    <div className=' flex justify-between'> 
    <div className=" w-1/2 flex gap-3 items-center justify-between  text-green-500    ">
          <Toggler />
          
         <RiForwardEndFill onClick={nextSong} className="    transition-transform duration-75 ease-in   active:text-white"
          size={48}
          aria-label="forwards song" />
          <Heart />
           
    </div>
    <div>

    <div onClick={shuffle} ref={ animationContainer } className=' relative bottom-5 w-24 rotate-180 ' /> 
    </div> 
    </div>

  );
};
 

export default Player;
