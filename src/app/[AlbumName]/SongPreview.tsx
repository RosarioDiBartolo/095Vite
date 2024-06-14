"use client";
import classNames from "classnames";
import { useGlobal } from "../AlbumProvider"; 
import Dropdown from "./Dropdown";
import { useState } from "react";
import { TfiControlBackward } from "react-icons/tfi";
import Toggler from "../Toggler";
import usePlayer from "./usePlayer";
import { useApp } from "../AppProvider";

const SongPreview = ({
  songId   , 
  className,
    
}: {
  songId: number;className?: string; 
  }) => {

  const { setCurrentSong, currentSongIndex ,album } = useGlobal();
   const IsCurrent = songId == currentSongIndex
  const [Open, setOpen] = useState(false)
  const [gameOpened] = useApp().game
  const song = album.Songs[songId]
  const {forward10Sec, rewind10Sec } = usePlayer()
  return (
    < div  onClick={() => {
      setCurrentSong(songId);
      console.log(songId);
      if (IsCurrent){
        setOpen( ! Open)
      }
    }}  className={ classNames( " transition-all duration-1000 w-full py-5  ", className,  {  "text-green-300   bg-gradient-to-b from-zinc-700  z-10 shadow-stone-800 shadow-xl -translate-y-4  ": IsCurrent, "to-zinc-700/80": ! Open,  "to-zinc-900": Open,    "text-gray-400     ": ! IsCurrent,    "landscape:fixed landscape:top-4 portrait:sticky portrait:-bottom-4 h-fit to-zinc-900/80 landscape:shadow-none backdrop-blur-md": gameOpened && IsCurrent ,  "sticky   portrait:-bottom-4": ! gameOpened && IsCurrent })} >    
    
        
      <div className="overflow-x-hidden w-full">
        <h2 className="text-md font-medium w-full">{song.Name } </h2>
        <p className={ classNames("text-xs font-thin w-full  ", {"infiniteScroll": IsCurrent})}>{ album.Name}...</p>
      </div>
        {
          IsCurrent &&( <Dropdown className="  "  open = { Open }>
           <div className="flex justify-between py-10"> 
           
           <TfiControlBackward onClick={rewind10Sec} className="    transition-transform duration-75 ease-in active:scale-150 active:text-white"
           size={50}
           aria-label="forwards song" />
                      <Toggler    />

           <TfiControlBackward onClick={forward10Sec} className="rotate-180   transition-transform duration-75 ease-in active:scale-150 active:text-white"
           size={50}
           aria-label="forwards song" /></div>
           </Dropdown>)

        }
    
     </ div>
  );
};
export  default SongPreview