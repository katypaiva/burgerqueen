import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Button from '../../components/Button/index'
import "./index.css"

function Delivery () {
    const [status, setStatus] = useState(true)
    const [request, setRequest] = useState([])
    useEffect(
        () => {
            firebase.firestore().collection('request').orderBy('timeK', 'asc')
            .get().then(querySnapshot => {
                const request = [];
                querySnapshot.forEach(doc => {request.push({id: doc.id, ...doc.data()})
                })
                setRequest(request)
            })
        },
        []
    )

    const updateSatus = (doc) => {
        doc.status = "Arrived";
        firebase.firestore().collection('request').doc(doc.id).update({status: "Arrived"}).then(
            setRequest([...request])
        )
    }    

    const time = (item) => {
        const timestamp = (item.timeK - item.timeH) / 1000;
        const hours = Math.floor(timestamp / 60 / 60);
        const minutes = Math.floor((timestamp - hours * 60 * 60) / 60);
        const seconds = Math.floor(timestamp - hours * 60 * 60 - minutes * 60 );
        return  hours + ':' + minutes + ':' +  seconds
    }
    
    return (
    <>
        <>
            <div className="buttons">
                <Button className={"status-btn"} handleClick={() => setStatus(true)} title={"Pedidos prontos"}></Button>
                <Button className={"status-btn"} handleClick={() => setStatus(false)} title={"Pedidos finalizados"}></Button>
            </div>
                {status ? 
                request.map((doc, index) => 
                        <div className="section-cards" key={index}>
                            {doc.status === 'Ready' ?
                            <div className="card">
                                <div className="name-and-table">
                                    <p className="p-client font">{doc.client}</p>
                                    <p className="p-table font">Mesa {doc.table}</p>
                                </div>
                                {doc.request.map(item => <p className="p-item font">{item.name}</p>)}
                                <p className="time font">Esse pedi ficou pronto em: {time(doc)}</p>
                                <Button handleClick={() => updateSatus(doc)} className={"done-btn"} title={'Entregue'}></Button>
                            </div>      
                            : false}
                        </div>
                    
                ):false}
        </>
        <>
            { status === false ?
                request.map((doc, index) => 
                
                    <div className="section-cards" key={index}>
                        {doc.status === 'Arrived' ?
                            <div className="card">
                                <div className="name-and-table">
                                    <p className="p-client font">{doc.client}</p>
                                    <p className="p-table font">Mesa {doc.table}</p>
                                </div>
                                {doc.request.map(item => <p className="p-item font">{item.name}</p>)}
                                <p className="time font">Esse pedi ficou pronto em: {time(doc)}</p>
                            </div>                 
                        : false}
                    </div>):false}
        </>
    </>
    )
}

export default Delivery