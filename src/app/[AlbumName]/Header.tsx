import { Children } from '../../Utils/types'
import classNames from 'classnames'
import { useApp } from '../AppProvider'
  
function Header({ className, children}: Children) {
const [ gameOpened] = useApp().game
  return (
    <header className={ classNames(' top-0 sticky items-end   ease-in-out', { "hidden": gameOpened}  )} >
        <div className={classNames(' absolute bottom-0 text-center w-full', className)}>  {children}</div>
      </header>
  )
}

export default Header