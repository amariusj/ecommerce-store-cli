import { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserAPI(token) {
    
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([])
    const [callback, setCallback] = useState(false)


    useEffect(() => {

        if (token) {

            const getUser = async () => {

                try {

                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } catch (err) {

                    alert(err.response.data.msg)

                }

            }

            getUser()

        }
    }, [token]) 


    const addCart = async (product) => {
        try {

            if (!isLogged) {

                alert("Please Login or Register to purchase this item.")

            } else {

                // Checks every item of the cart to ensure the product
                // that was just checked is not already apart of the cart
                const check = cart.every(item => {
                    return item._id !== product._id
                })

                // If product is not already in the cart, add it to the cart
                // and set its quantity to one
                if (check) {

                    setCart([...cart, {...product, quantity: 1}])

                    await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                        headers: {Authorization: token}
                    })

                    alert("Added to cart.")

                } else {

                    // If product is already in cart, send message
                    alert("This product has already been added to the cart.")
                    
                }

            }

        } catch (err) {

            if (err) alert(err.response.data.msg)

        }
    }

    // Run this function when hitting the submit button
    const loginSubmit = async (e, user) => {

    // Prevent the page from re-loading
    e.preventDefault()

    try {
      // Post to the api with the current user state as the
      // request body. So it should look like:
      // {
      //    email: amarius@amariusjones.com
      //    password: 12345678 
      // }
      await axios.post('/user/login', {...user})

      // localStorage is a property of the window that allows you to
      // access a storage object for the document's origin; the stored
      // data is saved across browser sessions. setItem adds a data item to
      // the storage object
      localStorage.setItem('firstLogin', true)

      // redirect the window to the following URL, which in this case is
      // the home page
      window.location.href = "/"

    } catch (err) {

      // if there's an error from the server, pop an alert and show
      // the message there
      alert(err.response.data.msg)
      console.log(err)

    }
  }

    return{
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        history: [history, setHistory],
        callback: [callback, setCallback],
        addCart: addCart,
        loginSubmit: loginSubmit
    }

}