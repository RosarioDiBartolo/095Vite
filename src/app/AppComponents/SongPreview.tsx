"use client";
import classNames from "classnames";
import { useGlobal } from "../AlbumProvider"; 
  
import { useApp  } from "../AppProvider";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import {   PercentageGradient } from "../../Utils/General";
import { useAudioTime } from "../../Utils/AudioUtils"; 
import { motion } from "framer-motion";

interface SongPreviewProps  {
  songId: number;className?: string; 
  }
 
const SongPreview = ({
  songId   , 
  className,
    
}:SongPreviewProps ) => {

  const { setCurrentSong, currentSongIndex ,album, getColor } = useGlobal();
  const IsCurrent = songId == currentSongIndex
  const [gameOpened] = useApp().game
  const player = useGlobalAudioPlayer()
  const { playing, duration  } = player
  const song = album.Songs[songId]
  const Time = useAudioTime(player );
  const percentage = Math.round(Time /  duration  *100)
  const backgroundImage = IsCurrent?   PercentageGradient({percentage, color1: '#10b981'}) : "";
  const Color = getColor({"text": 500})[0]

    return (
      
    < motion.div  onClick={() => {
      setCurrentSong(songId);
      console.log(songId);

      
    }}  className={ classNames( " transition-all duration-1000 w-full   overflow-hidden    ",  className,   {  "  z-10 shadow-black/80 shadow-xl  bg-zinc-800      ": IsCurrent , [Color]: IsCurrent,  "-translate-y-4 -bottom-4 ":IsCurrent &&  playing,"bottom-0 ":IsCurrent &&  ( !playing) ,  "text-gray-400     ": ! IsCurrent,    " h-fit   landscape:shadow-none landscape:fixed landscape:top-4 portrait:sticky portrait:-bottom-4   ": gameOpened && IsCurrent, "sticky via-zinc-800  ": (! gameOpened) && IsCurrent   })}
     >    
                  <motion.div className="py-[1px] w-full" animate = {{backgroundImage}} />

        <div className="py-5 px-6">
           
        <h2 className="text-md font-medium w-full">{song.Name } </h2>
        <p className={ classNames("text-xs  font-thin w-full  ", {"infiniteScroll": IsCurrent && ! gameOpened})}>{ album.Name}...</p>
 
        </div>
 
         
     </ motion.div>
  );
};
export  default SongPreview