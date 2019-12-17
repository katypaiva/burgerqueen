import React from 'react'
import { Link } from 'react-router-dom'
import restaurant from '../../img/restaurant.png'
import kitchen from '../../img/kitchen.png'
import Header from '../../components/Header/index'
import './index.css'

function Main() {
 return (
   <>
    <Header />
    <div className="btn">
      <Link className="link" to="/pages/Hall/index">
        <div className="restaurant-btn">
            <img src={restaurant} />
            <p className="page">RESTAURANT</p>
        </div>
      </Link>
      <Link className="link" to="/pages/Kitchen/index">
        <div className="kitchen-btn">
          <img src={kitchen} />
          <p className="page">KITCHEN</p>
        </div>
      </Link>
    </div>
    </>

 )
}


export default Main