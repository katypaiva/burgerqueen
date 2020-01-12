import React from 'react'

function Input(props) {

    return (
        <input ref={props.value} type={props.type} placeholder={props.placeholder} className={props.className} />
    )

}


export default Input

