"use client"; 

import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useGlobal } from "../AlbumProvider";
import classNames from "classnames"; 
import GameToggler from "./GameToggler"; 
  

export default function AlbumCover() {
  
  const { album } = useGlobal();
  const { Name, Logo } = album || {}; // Destructure album with default empty object
  const { playing } = useGlobalAudioPlayer();
 
   return (
    
    <div className="     landscape:px-14 landscape:py-10  z-0  landscape:h-svh flex-1 flex items-end p-6  gap-6 "
     > 
      <div className=" flex-1 max-h-full aspect-square relative ">
      <img
          //priority
            src={Logo}
            //fill
            alt={`Album cover of ${Name}`}
            
            className={classNames(
              " m-auto landscape:h-full min-w-60 object-cover transition-all duration-[2000ms] ease-out  shadow-zinc-950",
              { "shadow-xl  ": playing }
            )}
          />
      </div>

      <div className=" portrait:hidden  ">
        <GameToggler />
        <div className=" max-w-full    ">
          <h1 className="  text-4xl font-bold bg-gradient-to-r from-slate-400 to-slate-900 bg-clip-text text-transparent">
            {album.Name}
          </h1>
          <p>
            <span className="font-sbold"> Rickie snice </span>
          </p>
        </div>
      </div>
    </div>
  );
}
 