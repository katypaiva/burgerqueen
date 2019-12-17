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
    const [allrequest, setAllrequest] = useState([])


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

    const handleBreakfast = (item) => {
        setRequest([...request, item])
    }
    const handleAllDay = (item) => {
        setAllrequest([...allrequest, item])
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
            allrequest
        })
    } 

    const delItem = (item, state, setstate) => {
        const index = state.indexOf(item)
          state.splice(index, 1)
          setstate([...state])
        }
    

    return (
        <div>
            <Button handleClick={() => setMenu(true)} title={"Breakfast"}/>
            <Button handleClick={() => setMenu(false)} title={"Lunch"}/>
            <div>
                <label>Name:</label>
                <Input value={nameInput} />
                <label>Table:</label>
                <Input value={tableInput} />
            </div>
            {menu ? 
                <div>
                    {state.map((item) => 

                        <div key={item.id}>     
                            <div className='item-entry'>    
                                <Button title={item.name} handleClick={() => handleBreakfast(item)} /> {item.price} reais 
 
                            </div>   
                        </div>

                        )} 
                </div> 

            : 
            <div>
            <div> 
                    <H1 title={"Burgers"} />
                    {all.map((item) => 
                        item.type === "Burgers" ?
                        <div key={item.id}>  
                            <div className='item-entry'>    
                                <Button title={item.name} handleClick={() => handleAllDay(item)} /> {item.price} reais 
                            </div>   
                        </div> :
                        false
                        )} 
                </div>
            

            <div> 
                <H1 title={"Drinks"} />
                {all.map((item) => 
                    item.type === "Drinks" ?
                    <div key={item.id}>  
                        <div className='item-entry'>    
                             <Button title={item.name} handleClick={() => handleAllDay(item)} /> {item.price} reais 
                         </div>   
                    </div> 
                     :false
                     )} 
            </div>

            <div> 
                <H1 title={"Cia"} />
                {all.map((item) => 
                    item.type === "Cia" ?
                    <div key={item.id}>  
                        <div className='item-entry'>    
                             <Button title={item.name} handleClick={() => handleAllDay(item)} /> {item.price} reais 
                         </div>   
                    </div> 
                     :false
                     )} 
            </div>

        </div>
            }
        
        <Button handleClick={submit} title={"Send"} />

        <div className="resume">
               { menu?
                request.map((item, index) => 
                    <div key={index}>
                        <li>{item.name} = 
                    {item.price} reais</li> 
                    <Button handleClick={() => delItem(item, request, setRequest)} title={'-'}/>
                    </div>
                )
                
            :
                allrequest.map(item => 
                    <div>
                        <li>{item.name} = 
                    {item.price} reais</li> 
                    <Button handleClick={() => delItem(item, allrequest, setAllrequest)} title={'-'}/>
                    </div>
                )
            } 

        </div>
                {menu ?
                <div className="total">
                    <p>Total value: <strong>{request.reduce((total, value) => total + value.price, 0)}</strong> reais</p>
                </div>
               :
                 <div className="total">
                    <p>Total value: <strong>{allrequest.reduce((total, value) => total + value.price, 0)}</strong> reais</p>
                </div> 
                }


     </div>
    
    )
        
}

export default  Hall