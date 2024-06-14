import {  useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { HfInference } from "@huggingface/inference"

import { BsFillEmojiWinkFill } from "react-icons/bs";

const hf = new HfInference("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")


interface UIProps{
  InitialText?: string | undefined;
}

function UI({InitialText = ""}: UIProps) {
  
  const [Summary, setSummary] = useState<string >(    ""  )
  const query = useRef< HTMLTextAreaElement >( null )
  const getSummary  = async ()=>{

    console.log(Summary)
    if (query.current?.value ){
      const result = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: query.current?.value
      })

     setSummary( result.summary_text )
    }
    
  }

  return (
<div className="max-w-lg m-auto">
      <code>
        Built with <a href="https://react.dev" className="w-full" target="_blank">React</a> + <a href="https://vitejs.dev" target="_blank " className="  "> Vite </a> <BsFillEmojiWinkFill className="inline" />

      </code>
       <div className="relative flex flex-col items-center">
           <img src={viteLogo} className="logo  w-full   animate-pulse animate-ping absolute left-0 top-0 " alt="Vite logo" />
            <img src={reactLogo} className="logo react w-full" alt="React logo" />
  
      </div>
 

      <h1>AI summarizer</h1>
      <div className="  relative  bg-black resize-y overflow-hidden flex flex-col p-3">
         <textarea ref={ query}  className=" p-4 resize-none min-h-24 w-full  bg-black  text-gray-600 hover:text-teal-100 rounded-md   flex-1" defaultValue={InitialText} />   
 
         <button className=" roudned-md  self-end m-2" onClick={getSummary} >
            Plus
         </button>
         
      </div>
      
      <p className=" max-w-full border rounded-md p-3 font-bold ">
          {Summary}
         </p>
      <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      <p className="read-the-docs">
        Select some text to log it on the console (check browser console)
      </p>
    </div>  )
}

export default UI