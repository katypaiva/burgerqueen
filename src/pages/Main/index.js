import React from 'react'
import {  Link } from 'react-router-dom'


function Main() {
 return (
    <div>
      <Link to="/pages/Hall/index" className="btn"><button>Restaurante</button></Link>
      <Link to="/pages/Kitchen/index" className="btn"><button>Cozinha</button></Link>
    </div>

 )
}

export default Main