import React from 'react'
import { Link } from 'react-router-dom'
import restaurant from '../../img/restaurant.svg'
import kitchen from '../../img/kitchen.svg'
import Header from '../../components/Header/index'
import H1 from '../../components/H1/index'
import './index.css'

function Main() {
 return (
   <>
    <Header />
    <H1 class={"title-main font-config"} title={"Onde você trabalha?"}/>
    <div className="div-btn">
      <Link className="link" to="/pages/Hall/index">
        <div className="departament-btn restaurant-config">
            <img src={restaurant} />
            <p className="page-link font-config">RESTAURANT</p>
        </div>
      </Link>
      <Link className="link" to="/pages/Kitchen/index">
        <div className="departament-btn kitchen-config">
          <img src={kitchen} />
          <p className="page-link font-config">KITCHEN</p>
        </div>
      </Link>
    </div>
    </>
 )
}

export default Main