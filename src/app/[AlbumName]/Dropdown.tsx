import classNames from 'classnames'
import { Children } from '../../Utils/types'

function Dropdown({ children, className,  open}:{ open: boolean} & Children) {
  return (
    <div onClick={ e => {e.preventDefault(); e.stopPropagation()}} className={ classNames( "group transition-all duration-[2000ms] ease-linear overflow-y-hidden", { " open max-h-[1000px] ": open, " max-h-0": ! open }, className )}>
        { children }
    </div>
  )
}

export default Dropdown