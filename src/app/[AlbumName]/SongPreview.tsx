"use client";
import classNames from "classnames";
import { useGlobal } from "../AlbumProvider"; 
  
import { useApp  } from "../AppProvider";
import { useGlobalAudioPlayer } from "react-use-audio-player";
interface SongPreviewProps  {
  songId: number;className?: string; 
  }
 
const SongPreview = ({
  songId   , 
  className,
    
}:SongPreviewProps ) => {

  const { setCurrentSong, currentSongIndex ,album } = useGlobal();
   const IsCurrent = songId == currentSongIndex
   const [gameOpened] = useApp().game
  const {playing} = useGlobalAudioPlayer()
  const song = album.Songs[songId]
    return (
    < div  onClick={() => {
      setCurrentSong(songId);
      console.log(songId);
       
    }}  className={ classNames( " transition-all duration-1000 w-full py-5 overflow-hidden  ", className,  {  "text-green-300        z-10 shadow-black/80 shadow-xl    border-green-600 border-t- bg-gradient-to-r from-zinc-800  ": IsCurrent , "-translate-y-4 -bottom-4 ":IsCurrent &&  playing,"bottom-0 ":IsCurrent &&  ( !playing) ,  "text-gray-400     ": ! IsCurrent,    " h-fit   landscape:shadow-none landscape:fixed landscape:top-4 portrait:sticky portrait:-bottom-4  ": gameOpened && IsCurrent, "sticky via-zinc-800": ! gameOpened && IsCurrent   })} >    
    
        
      <div className="  w-full">
        <h2 className="text-md font-medium w-full">{song.Name } </h2>
        <p className={ classNames("text-xs font-thin w-full  ", {"infiniteScroll": IsCurrent && ! gameOpened})}>{ album.Name}...</p>
      </div>
       
    
     </ div>
  );
};
export  default SongPreview