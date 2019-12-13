import React from 'react'


function Button (props){
    return (
        <button onClick={props.handleClick}>{props.title}</button>
    )
}

export default Button