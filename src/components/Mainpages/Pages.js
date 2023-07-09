import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

// import pages
import Products from './products/Products'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import DetailProduct from './detailProduct/DetailProduct'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

const Pages = () => {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Routes>
            <Route path="/" exact Component={Products} />

            <Route path="/detail/:id" exact element={<DetailProduct />} />

            <Route path="/login" exact Component={isLogged ? NotFound : Login} />
            <Route path="/signup" exact Component={isLogged ? NotFound : SignUp} />
            <Route path="/cart" exact Component={Cart} />
            <Route path="/history" exact Component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact element={isLogged ? <OrderDetails /> : <NotFound />} />
            <Route path="/category" exact Component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact Component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact element={isAdmin ? <CreateProduct /> : <NotFound />} />

            <Route path="*" exact Component={NotFound} />
        </Routes>
    )
}

export default Pages