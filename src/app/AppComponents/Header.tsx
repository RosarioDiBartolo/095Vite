import { Children } from '../../Utils/types'
import classNames from 'classnames'
import { useScrollDelta } from '../../Utils/Clienthooks';

function Header({ className, children}: Children) {
  const ScrollDelta = useScrollDelta()
  const up = ScrollDelta > 0
  console.log(ScrollDelta)
   return (
     <header className={ classNames('  bg-gradient-to-b from-black px-6 py-3 transition duration-200  overflow-hidden backdrop-blur-md z-20   sticky top-0  w-full  text-white  flex flex-col justify-end ' , { "max-h-[1000px]": up, "max-h-0": ! up} )} >
         <div className={classNames(' w-full', className,   )}>  {children} </div>
      </header>
   )
}

export default Header