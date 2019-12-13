import React, { useState, useEffect } from 'react'
import firebase from '../../util/firebaseUtils'
import Input from '../../components/inputUser/index'
import Button from '../../components/Button/index'


function Hall() {
    const [state, setState] = useState([]);
    const [menu, setMenu] = useState(Boolean);
    const [all, setAll] = useState([]);

    useEffect(
        () => {
            firebase.firestore().collection('menu')
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => { setState(currentVal => [...currentVal, doc.data()])})})
        },
        []
      );

      useEffect(
        () => {
            firebase.firestore().collection('all')
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => { setAll(currentVal => [...currentVal, doc.data()])})})
        },
        []
      );
        
    return (
        <div>
            <Button handleClick={() => setMenu(true)} title={"Breakfast"}/>
            <Button handleClick={() => setMenu(false)} title={"Lunch"}/>
            <div>
                <Input />
            </div>
            {menu ? 
                <div>
                    {state.map((xis) => 
                        <div key={xis.id}>     
                            <div className='xis-entry'>    
                                <Button title={xis.name} /> {xis.price} reais    
                            </div>   
                        </div> )} 
                </div> 

            : 

                <div>
                    {all.map((xis) => 
                        <div key={xis.id}>     
                            <div className='xis-entry'>    
                                <Button title={xis.name} /> {xis.price} reais    
                            </div>   
                        </div> )} 
                </div>}
            </div>
    )

}

export default Hall