 
export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  

export function getOrientation(){
  const orientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
  return orientation;
}