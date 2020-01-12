import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Button from '../../components/Button/index'



function Kitchen() {
    const [request, setRequest] = useState([])

    useEffect(
        () => {
            firebase.firestore().collection('request').orderBy('timeH', 'asc')
            .get().then(querySnapshot => {
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

    const addSatus = (doc) => {
      doc.status = "Pronto";
        firebase.firestore().collection('request').doc(doc.id).update({
            status: "Pronto",
            timeK: new Date().getTime(),

        }).then(
            setRequest([...request])
        )
            
    }

    
    return (
        <div>
            {request.map((doc, index) => {
                if(doc.status === "Preparo"){
                    
                    return (<div key={index}>
                        <p>{doc.client}</p>
                        <p>{doc.table}</p>
                        {
                            doc.request
                            ? doc.request.map(item => <p>{item.name}</p>)
                            : null
                        }
                        <Button handleClick={()=> addSatus(doc)} title={'Pronto'} />
                    </div> )
                }

            }

               
            
            )}
        </div>
    )
}

export default Kitchen