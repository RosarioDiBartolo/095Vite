 
export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  

export function getOrientation(){
  const orientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
  return orientation;
}

   
export interface GradientProps {
  percentage: number;
  color1: string;
  color2?: string;
}

 
   
export const PercentageGradient = ({ percentage, color1, color2 }: GradientProps)=>{
  
  return `linear-gradient(to right, ${color1} ${percentage}%, ${color2 || 'transparent'} ${percentage}%)` 
 }
 