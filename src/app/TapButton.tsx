import classNames from 'classnames'
import React from 'react'

function TapButton( props: React.ButtonHTMLAttributes<HTMLButtonElement> ) {
  return (
        
    <button { ...props } className={classNames( "tap overflow-visible rounded-full p-3", props.className)} />
  )
}

export default TapButton