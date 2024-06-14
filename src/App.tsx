import { useState, useEffect } from "react";
import "./App.css";
import UI from "./UI";

function App() {
  const [text, setText] = useState<string>("");
 
  const handleMessage = (message: { selectedText?: string }) => {
    if (message.selectedText !== undefined) {
      setText(message.selectedText);
    }
  };

  useEffect(() => {
    const gatherSelectedText = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });


      chrome.scripting.executeScript({
        target: { tabId: tab?.id as number },
        func: () => {
          const selection = document.getSelection();
          chrome.runtime.sendMessage({ selectedText: selection?.toString() });
        },
      });
    };

    gatherSelectedText();

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

 

  return (
    <UI InitialText = {text} />
  );
}

export default App;
