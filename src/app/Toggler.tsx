const Play = FaCirclePlay;
const Pause = FaCirclePause;
const useToggler = ()=>{
    const { playing} = useGlobalAudioPlayer()
    return  playing ? Pause : Play;
} 
import classNames from 'classnames';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

function Toggler() {
    const Icon = useToggler()
    const {togglePlayPause,playing } = useGlobalAudioPlayer()
  return (
    <Icon onClick={  togglePlayPause }   className={ classNames("rounded-full  animate-bounce   ", {" shadow-lg    ": playing, "  ": !playing})} size={64} />

   )
}

export default Toggler