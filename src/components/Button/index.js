import React from 'react'


function Button (props){
    return (
        <button onClick={props.handleClick} className={props.className} disabled={props.disabled}>{props.title}</button>
    )
}

export default Button