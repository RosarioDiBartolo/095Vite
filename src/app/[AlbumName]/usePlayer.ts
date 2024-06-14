import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useAudioTime } from "../../Utils/AudioUtils";
import { useCallback } from "react";
 
export default function usePlayer ()   {
    const player = useGlobalAudioPlayer();
  
    const currentTime = useAudioTime(player);
  
    const {   seek } = player;
  
    const rewind10Sec = useCallback(() => {
      seek(currentTime - 10);
    }, [currentTime, seek]);
  
    const forward10Sec = useCallback(() => {
      seek(currentTime + 10);
    }, [currentTime, seek]); 
  
    return {  rewind10Sec, forward10Sec}
  } 
 