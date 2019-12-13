import React, { useRef } from 'react'
import firebase from '../../util/firebaseUtils'


function Input() {
    const nameInput = useRef();
    const tableInput = useRef();

    const submit = (e) => {

        e.preventDefault()        
       const client = nameInput.current.value;
       const table = tableInput.current.value;
       console.log(table)

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
            <button onClick={submit}>Send</button>
        </form>
    )

}


export default Input