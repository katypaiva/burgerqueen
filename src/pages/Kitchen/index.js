import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Button from '../../components/Button/index'



function Kitchen() {
    const [request, setRequest] = useState([])

    useEffect(
        () => {
            firebase.firestore().collection('request')
            .get().then(querySnapshot => {
                const request = [];
                querySnapshot.forEach(doc => { 
                    request.push(doc.data())
                })
                setRequest(request)
            })
        },
        []
    )

    const addSatus = () => {
        firebase.firestore().collection('request').doc(id).update({
            status: "Preparando"
        })
            
    }

    const updateSatus = () => {
        firebase.firestore().collection('request').doc(id).update({
            status: "Pronto"
        })
            
    }

        console.log(request)
    return (
        <div>
            {request.map((doc, index) => 
                <div key={index}>
                    <p>{doc.client}</p>
                    <p>{doc.table}</p>
                    {
                        doc.request
                        ? doc.request.map(item => <p>{item.name}</p>)
                        : null
                    }
                    <Button handleClick={addSatus} title={'Preparando'} />
                    <Button handleClick={updateSatus} title={'Pronto'} />
                </div> 
            
            
            )}
        </div>
    )
}

export default Kitchen