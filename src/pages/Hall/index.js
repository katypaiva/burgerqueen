import React, { useState, useEffect, useRef } from "react"
import firebase from "../../util/firebaseUtils"
import Input from "../../components/Input/index"
import Button from "../../components/Button/index"
import H1 from "../../components/H1/index"
import { Link } from 'react-router-dom'
import "./index.css"


function Hall() {
    const [state, setState] = useState([]);
    const [menu, setMenu] = useState(Boolean);
    const [all, setAll] = useState([]);
    const [request, setRequest] = useState([])

    useEffect(
        () => {
            firebase.firestore().collection('menu').get().then(querySnapshot => {
                const menu = [];
                querySnapshot.forEach(doc => { 
                    menu.push(doc.data())
                })
                setState(menu)
            })
            firebase.firestore().collection('all').get().then(querySnapshot => {
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
    const obstext = useRef();
    const submit = () => {
       const client = nameInput.current.value;
       const table = tableInput.current.value;
       const obs = obstext.current.value;
        firebase.firestore().collection('request').add({
            client,
            obs,
            table,
            request,
            status: "Preparo",
            timeH: new Date().getTime(),
            
        })
        setRequest([])
        obstext.current.value = "";
    } 

    const delItem = (item) => {
        const index = request.indexOf(item)
          request.splice(index, 1)
          setRequest([...request])
        }
    
    return (
        <>
            <>
            <Link to="/pages/Delivery/index"><Button className={"link-request"} title={"Acompanhe os pedidos"}/></Link>
                <H1 class={"menu-legend font"} title={"Informações do pedido"}/>
                <section>
                    <div className="section-content">
                        <label className="lable font">Nome do cliente</label>
                        <Input value={nameInput} placeholder={"Ex: Fabio"} className={"input-name font input"} type={'text'} />
                    </div>
                    <div className="section-content">
                        <label className="lable font">Número da mesa</label>
                        <div className={"number-input"}>
                            <div className="n font">Nº</div><Input value={tableInput} placeholder={"Ex: 02"}className={"input-table font input"} type={'number'} />
                        </div>                       
                    </div>
                </section>
            </>
            <div className="menu-type">
                <H1 class={"menu-legend space-above font"} title={"Escolha o cardápio"}/>
                <Button className={"menu-type-btn"} handleClick={() => setMenu(true)} title={"Café da manhã"}/>
                <Button className={"menu-type-btn"} handleClick={() => setMenu(false)} title={"Dia todo"}/>
            </div>
            <div className="request-section">
                <div className="menu">
                <div className="section-legend font">Cardápio da realeza</div>
                    {menu ? 
                        <>
                            <>
                                <H1 class={"item-legend font"} title={"Cafés"} />
                                {state.map((item, index) => 
                                    item.type === "coffee" ?
                                    <div className={"menu-item"} key={index}>       
                                        <div>
                                            <p className="p-name font">{item.name}</p>
                                            <p className="p-price font">R${item.price},00</p>
                                        </div> 
                                        <Button className={"adition-btn"} title={"+"} handleClick={() => handleRequest(item)} />
                                    </div>
                                :false  )} 
                            </> 
                            <>
                                <H1 class={"item-legend font"} title={"Outras Bebidas"} />
                                {state.map((item, index) => 
                                    item.type === "drink" ?
                                    <div className={"menu-item"} key={index}>        
                                        <div>
                                            <p className="p-name font">{item.name}</p>
                                            <p className="p-price font">R${item.price},00</p>
                                        </div> 
                                        <Button className={"adition-btn"} title={"+"} handleClick={() => handleRequest(item)} />
                                    </div>
                                :false  )} 
                            </> 
                            <>
                                <H1 class={"item-legend font"} title={"Comida"} />
                                {state.map((item, index) => 
                                    item.type === "food" ?
                                    <div className={"menu-item"} key={index}>        
                                        <div>
                                            <p className="p-name font">{item.name}</p>
                                            <p className="p-price font">R${item.price},00</p>
                                        </div> 
                                        <Button className={"adition-btn"} title={"+"} handleClick={() => handleRequest(item)} />
                                    </div>
                                :false  )} 
                            </> 
                        </>
                    : 
                    <>
                            <> 
                                <H1 class={"item-legend font"} title={"Hamburguer Simples"} />
                                {all.map((item, index) => 
                                    item.type === "Simple Burgers" ?
                                        <div className={"menu-item"} key={index}>     
                                            <div>
                                                <p className="p-name font">{item.name}</p>
                                                <p className="p-price font">R${item.price},00</p>
                                            </div> 
                                                <Button className={"adition-btn"} title={"+"} handleClick={() => handleRequest(item)} />
                                        </div> 
                                :false )} 
                            </>
                            <> 
                                <H1 class={"item-legend font"} title={"Hamburguer Duplo"} />
                                {all.map((item, index) => 
                                    item.type === "Double Burgers" ?
                                        <div className={"menu-item"} key={index}>     
                                            <div>
                                                <p className="p-name font">{item.name}</p>
                                                <p className="p-price font">R${item.price},00</p>
                                            </div> 
                                                <Button className={"adition-btn"} title={"+"} handleClick={() => handleRequest(item)} />
                                        </div> 
                                    :false )} 
                            </>
                            <> 
                                <H1 class={"item-legend font"} title={"Bebidas"} />
                                {all.map((item, index) => 
                                    item.type === "Drinks" ?
                                        <div className={"menu-item"} key={index}>     
                                            <div>
                                                <p className="p-name font">{item.name}</p>
                                                <p className="p-price font">R${item.price},00</p>
                                            </div> 
                                            <Button className={"adition-btn"} title={"+"} handleClick={() => handleRequest(item)} />
                                        </div> 
                                    :false )} 
                            </>
                            <> 
                                <H1 class={"item-legend font"} title={"Acompanhamentos"} />
                                {all.map((item, index) => 
                                    item.type === "Cia" ?
                                        <div className={"menu-item"} key={index}>     
                                            <div>
                                                <p className="p-name font">{item.name}</p>
                                                <p className="p-price font">R${item.price},00</p>
                                            </div> 
                                            <Button className={"adition-btn"} title={"+"} handleClick={() => handleRequest(item)} />
                                        </div> 
                                    :false )} 
                            </>
                            <> 
                                <H1 class={"item-legend font"} title={"Extras"} />
                                {all.map((item, index) => 
                                    item.type === "plus" ?
                                        <div className={"menu-item"} key={index}>     
                                            <div>
                                                <p className="p-name font">{item.name}</p>
                                                <p className="p-price font">R${item.price},00</p>
                                            </div> 
                                            <Button className={"adition-btn"} title={"+"} handleClick={() => handleRequest(item)} />
                                        </div> 
                                    :false )} 
                            </>
                        </>}
                </div>
                <div className="resume">
                    <>
                        <H1 class={"resume-legend font"} title={"Resumo do pedido"} />               
                    </>
                    { menu?
                        request.map((item, index) => 
                        <div className="resume-itens" key={index}>
                            <p className="li-item font">{item.name}</p>
                            <div className="price-and-delbtn">
                                <p className="li-price font">R${item.price},00</p> 
                                <Button className={"delete-btn"} handleClick={() => delItem(item)} title={'+'} />
                            </div>
                        </div>
                        )                
                    :
                        request.map((item, index) => 
                        <>
                            <div className="resume-itens" key={index}>
                                <p className="li-item font">{item.name}</p>
                                <div className="price-and-delbtn">
                                    <p className="li-price font">R${item.price},00</p> 
                                    <Button className={"delete-btn"} handleClick={() => delItem(item)} title={'+'} />
                                </div>
                            </div>
                        </>    
                        )}
                        {request.length >= 1? 
                            <>
                                <textarea className="obs font" placeholder="Observações" ref={obstext}></textarea>
                            </>
                            :false}
                        <div className="total">
                            <p className="p-total font">Total</p><p className="total-price font">R${request.reduce((total, value) => total + value.price, 0)},00</p>
                        </div>
                        <Button className={"submit-btn"} title={"Enviar"} handleClick={submit} />
                </div>
        </div>
    </>
    )      
}

export default  Hall