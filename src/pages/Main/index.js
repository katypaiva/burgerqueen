import React from 'react'
import {  Link } from 'react-router-dom'
import Button from '../../components/Button/index'


function Main() {
 return (
    <div>
      <Link to="/pages/Hall/index" className="btn"><Button title={"Restaurante"}/></Link>
      <Link to="/pages/Kitchen/index" className="btn"><Button title={"Restaurante"}/></Link>
    </div>

 )
}

export default Main