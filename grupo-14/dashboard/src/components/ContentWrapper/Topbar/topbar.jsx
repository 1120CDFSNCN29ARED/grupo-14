import React from 'react'
import logo from '../../../img/logo-nuevo.png'
import {Link} from 'react-router-dom'
import '../Topbar/topbar.css'

function topbar() {
    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" className="cart-logo" />
                </Link>
            </div>

        </header>
    )
}

export default topbar
