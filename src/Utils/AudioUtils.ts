import { useEffect, useRef, useState } from "react"
import { AudioPlayer  } from "react-use-audio-player"
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useCallback } from "react";
  
 
export function useAudioTime(player: AudioPlayer) {
    const frameRef = useRef<number>()
    const [pos, setPos] = useState(0)
    const { getPosition } = player
    
    useEffect(() => {
        const animate = () => {
            setPos(getPosition())
            frameRef.current = requestAnimationFrame(animate)
        }

        frameRef.current = window.requestAnimationFrame(animate)

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }
        }
    }, [getPosition])
    
    return pos;
}
 
export function usePlayer ()   {
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