import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Button from '../../components/Button/index'
import H1 from "../../components/H1/index" 
import "./index.css"

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
      doc.status = "Ready";
        firebase.firestore().collection('request').doc(doc.id).update({
            status: "Ready",
            timeK: new Date().getTime(),

        }).then(
            setRequest([...request])
        )
    }

   

    
    return (
        <div className="kitchen">
            <div>
                <H1 title={"Pedidos em andamento"} class={"kitchen-legend font"} />
            </div>
            <div>
                {request.map((doc, index) => {
                    if(doc.status === "Preparo"){
                        return (
                            <div className="card">                                
                                <div className="name-and-table">
                                    <p className="p-client font">{doc.client}</p>
                                    <p className="p-table font">Mesa {doc.table}</p>
                                </div>
                                <div key={index} className="item-and-obs">
                                    <div className="items">
                                        { doc.request ? 
                                        doc.request.map(item =>
                                            <p className="p-item font">{item.name}</p>
                                            ): null}
                                    </div>
                                    <p className="p-obs font"><strong>Observações:</strong><br/>{doc.obs}</p>
                                </div> 
                                <p className="time font">Pedido feito ás {doc.time}</p>
                                <Button handleClick={()=> addSatus(doc)} className={"done-btn"} title={'Pronto'} />
                            </div>)
                    }
                })}
            </div>
        </div>
    )
}

export default Kitchen