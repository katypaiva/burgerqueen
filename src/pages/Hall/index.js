import React, { useState, useEffect, useRef } from 'react'
import firebase from '../../util/firebaseUtils'
import Input from '../../components/inputUser/index'
import Button from '../../components/Button/index'
import H1 from '../../components/H1/index'
import './index.css'


function Hall() {
    const [state, setState] = useState([]);
    const [menu, setMenu] = useState(Boolean);
    const [all, setAll] = useState([]);
    const [request, setRequest] = useState([])

    useEffect(
        () => {
            firebase.firestore().collection('menu')
            .get().then(querySnapshot => {
                const menu = [];
                querySnapshot.forEach(doc => { 
                    menu.push(doc.data())
                })
                setState(menu)
            })
            firebase.firestore().collection('all')
            .get().then(querySnapshot => {
                const menu = [];
                querySnapshot.forEach(doc => { 
                    menu.push(doc.data())
                })
                setAll(menu)
            })
        },
        []
      );

    const handleRequest = (item) => {
        setRequest([...request, item])
    }

    
    const nameInput = useRef();
    const tableInput = useRef();
    const submit = () => {
       const client = nameInput.current.value;
       const table = tableInput.current.value;

        firebase.firestore().collection('request').add({
            client,
            table,
            request,
            status: "Preparo",
            timeH: new Date().getTime(),
            
        })
        setRequest([])
    } 

    const delItem = (item) => {
        const index = request.indexOf(item)
          request.splice(index, 1)
          setRequest([...request])
        }
    

    return (
        <div>
            <Button handleClick={() => setMenu(true)} title={"Breakfast"}/>
            <Button handleClick={() => setMenu(false)} title={"Lunch"}/>
            <div>
                <label>Name:</label>
                <Input value={nameInput} type={'text'} />
                <label>Table:</label>
                <Input value={tableInput} type={'number'} />
            </div>
            {menu ? 
                <div>
                    {state.map((item, index) => 
                        <div key={index}>        
                                <Button title={item.name} handleClick={() => handleRequest(item)} /> {item.price} reais 
                        </div>
                        )} 
                </div> 
            : 
            <div>
                <div> 
                    <H1 title={"Simple Burgers"} />
                    {all.map((item, index) => 
                        item.type === "Simple Burgers" ?
                        <div key={index}>     
                                <Button title={item.name} handleClick={() => handleRequest(item)} /> {item.price} reais 
                        </div> :
                        false
                        )} 
                </div>
            
                <div> 
                    <H1 title={"Double Burgers"} />
                    {all.map((item, index) => 
                        item.type === "Double Burgers" ?
                        <div key={index}>     
                                <Button title={item.name} handleClick={() => handleRequest(item)} /> {item.price} reais   
                        </div> :
                        false
                        )} 
                </div>

            <div> 
                <H1 title={"Drinks"} />
                {all.map((item, index) => 
                    item.type === "Drinks" ?
                    <div key={index}> 
                             <Button title={item.name} handleClick={() => handleRequest(item)} /> {item.price} reais 
                    </div> 
                     :false
                     )} 
            </div>

            <div> 
                <H1 title={"Cia"} />
                {all.map((item, index) => 
                    item.type === "Cia" ?
                    <div key={index}>    
                             <Button title={item.name} handleClick={() => handleRequest(item)} /> {item.price} reais  
                    </div> 
                     :false
                     )} 
            </div>
            <div> 
                    <H1 title={"Plus"} />
                    {all.map((item, index) => 
                        item.type === "plus" ?
                        <div key={index}>  
                                <Button title={item.name} handleClick={() => handleRequest(item)} /> {item.price} reais 
                        </div> :
                        false
                        )} 
                </div>
        </div>
            }
        
        <Button handleClick={submit} title={"Send"} />

        <div className="resume">
               { menu?
                request.map((item, index) => 
                    <div key={index}>
                        <li>{item.name} = {item.price} reais</li> 
                    <Button handleClick={() => delItem(item)} title={'-'}/>
                    </div>
                )
                
            :
                request.map(item => 
                    <div>
                        <li>{item.name} = 
                    {item.price} reais</li> 
                    <Button handleClick={() => delItem(item)} title={'-'}/>
                    </div>
                )
            } 

        </div>
                <div className="total">
                    <p>Total value: <strong>{request.reduce((total, value) => total + value.price, 0)}</strong> reais</p>
                </div>
                

     </div>
    
    )
        
}

export default  Hall