import { useEffect, useRef, useState } from "react"
import { AudioPlayer  } from "react-use-audio-player"

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
 