import React, { useRef } from 'react'
import firebase from '../../util/firebaseUtils'
import Button from '../../components/Button/index'


function Input() {
    const nameInput = useRef();
    const tableInput = useRef();

    const submit = (e) => {

        e.preventDefault()        
       const client = nameInput.current.value;
       const table = tableInput.current.value;

        firebase.firestore().collection('client').add({
            client,
            table
        })
    } 

    return (
        <form>
            <h1>Registro do Pedido</h1>
            <div>
                <label>Name:</label>
                <input ref={nameInput} type="text" />
            </div>
            <div>
                <label>Table:</label>
                <input type="number" ref={tableInput}/>
            </div>
            <Button handleClick={submit} title={"Send"} />
        </form>
    )

}


export default Input