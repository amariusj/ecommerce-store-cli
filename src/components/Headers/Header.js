import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import icons
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'

const Header = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const adminRouter = () => {
        return(
            <>
                <li onClick={() => setMenu(!menu)}><Link to="/create_product">Create Product</Link></li>
                <li onClick={() => setMenu(!menu)}><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <>
                <li onClick={() => setMenu(!menu)}><Link to="/history">History</Link></li>
                <li onClick={() => setMenu(!menu)}><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/"
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>

            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'ManaTech Demo Store'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li onClick={() => setMenu(!menu)}><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : 
                    <>
                        <li onClick={() => setMenu(!menu)}><Link to="/login">Login</Link></li>
                        <li onClick={() => setMenu(!menu)}><Link to="/signup">Sign Up</Link></li>
                    </>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu"/>
                </li>

            </ul>

           {
            isAdmin ? '' :
            <div className="cart-icon" onClick={() => setMenu(!menu)}>
                <span>{cart.length}</span>
                <Link to="/cart">
                    <img src={Cart} alt="" width="30" />
                </Link>
            </div>
           }

        </header>
    )
}

export default Header