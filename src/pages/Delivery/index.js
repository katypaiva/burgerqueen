import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Button from '../../components/Button/index'


function Delivery () {

    const [request, setRequest] = useState([])
    useEffect(
        () => {
            firebase.firestore().collection('request').get().then(querySnapshot => {
                const request = [];
                querySnapshot.forEach(doc => { 
                    request.push({id: doc.id,
                        ...doc.data()})
                })
                setRequest(request)
            })
        },
        []
    )

    const updateSatus = (doc) => {
        doc.status = "Entregue";
        firebase.firestore().collection('request').doc(doc.id).update({
            status: "Entregue"
        }).then(
            setRequest([...request])
        )
    }    

    return (
        <div>
            <div>
                {request.map((doc, index) => 
                <div key={index}>
                    {doc.status === 'Pronto' ?
                        <>
                            <p>Table: {doc.table}</p>
                            <p>Name: {doc.client}</p>
                            {doc.request.map(item => item.name)}
                            <Button handleClick={() => updateSatus(doc)} title={'Entregue'}></Button>
                            
                        </>                
                    : false}
                </div>)}
            </div>
            
            <div>
                <h1>Finalizado</h1>
                {request.map((doc, index) => 
                <div key={index}>
                    {doc.status === 'Entregue' ?
                        <>
                            <p>Table: {doc.table}</p>
                            <p>Name: {doc.client}</p>
                            
                            {doc.request.map(item => 
                                <p>{item.name}</p>)}
                        </>                
                    : false}
                </div> )}
            </div>
        </div>
    )

}

export default Delivery