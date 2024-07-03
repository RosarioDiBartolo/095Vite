
import { useScroll } from '../../Utils/Clienthooks';

function ScaleOverscroll() {
const Scroll = useScroll()
 
const zoom = Scroll < 1 ? Math.abs (Scroll): 0 / 2

if (zoom){
    document.body.classList.add("o")
}
else{
    document.body.classList.remove("o")
}
  
return ""
}

export default ScaleOverscroll