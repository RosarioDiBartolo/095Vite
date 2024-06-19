"use client";
import  { useState } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { SlGameController } from 'react-icons/sl';
import classNames from 'classnames';
import { useApp } from '../AppProvider';
import { IoMdArrowBack } from 'react-icons/io';
//import { useRouter } from 'next/navigation';
  const GameToggler = ({ className}: { className?: string}  ) => {
   const { playing } = useGlobalAudioPlayer();
  const [Error, setError] = useState(false)
 // const router = useRouter()
  const { game }= useApp()
  const [ gameOpened ,  setGameOpened]  = game;
  const handleClick =()=> {
    setError(! playing); 
     if ( playing ){
      //router.replace(`/${album.Url}/Game`)
      setGameOpened( true )
      window.scroll({
        top: 0, behavior: "smooth"
      })
    }}
   return (
    gameOpened ? <IoMdArrowBack  size={30} onClick={ () => setGameOpened( false )} className={ classNames(className)} />
    : <SlGameController size={30} onAnimationEnd={ ()=> setError(false)}  onClick={handleClick }    className={classNames(className, ' mb-1    landscape:animate-bounce transition-transform delay-100 duration-500 ease-in-out   ', { "active:fill-red-900 translate-x-40": !playing,  " animate-pulse translate-x-0": playing,  "shake":Error })} /> 

   );


};

export default GameToggler