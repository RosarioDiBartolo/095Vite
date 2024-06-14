 import React, { DetailedHTMLProps } from 'react'
import "./FancyButton.scss"
 
function FancyButton(props : DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>  ) {
  return (
        <button  {...props} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out" />
   )
}

export default FancyButton