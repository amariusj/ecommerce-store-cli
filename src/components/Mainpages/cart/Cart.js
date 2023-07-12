import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function Cart() {

  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [total, setTotal] = useState(0)
  const [token] = state.token

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    components: "buttons"
  }

  const style = {
    size: 'small',
    color: 'blue',
    shape: 'rect',
    label: 'checkout',
    tagline: false
}

  useEffect(() => {
      const getTotal = () => {
        const total = cart.reduce((prev, item) => {
          return prev + (item.price * item.quantity)
        }, 0)

        setTotal(total)
      }

      getTotal()
  })

  const increment = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1)
        }
      })
    }

    setCart([...cart])
    addToCart(cart)
  }

  const addToCart = async (cart) => {
    try {

      await axios.patch('/user/addcart', {cart}, {
        headers: {Authorization: token}
      })

    } catch (err) {

      alert(err.response.data.message)

    }
  }

  const addPayment = async (payment) => {

    try {

      // Grab payment ID and address from payment
      const { id } = payment
      const { address } = payment.purchase_units[0].shipping

      // Post the payment to the API
      await axios.post('/api/payment', {cart, paymentId: id, address}, {
        headers: {Authorization: token}
      })

      // Empties the cart on the client
      setCart([])

      // Saves the emptied cart to the mongo database
      addToCart([])

      // Confirms success to client
      alert("You have successfully placed an order.")

    } catch (err) {
      alert(err.response.data.msg)
    }

  }


  if (cart.length === 0) 
    return <h2 style={{
      textAlign: "center",
      fontSize: "5rem"
    }}>Cart Empty</h2>

  return (
    <div>
        {
            cart.map(product => (

                <div className="detail cart" key={product._id}>

                    <img src={product.images.url} alt="" className="img_container" />

                    <div className="box-detail">
                        <h2>{product.title}</h2>

                        <h3>$ {product.price * product.quantity}</h3>
                        <p>{product.description}</p>
                        <p>{product.content}</p>
                        
                        <div className="amount">
                            <button onClick={() => decrement(product._id)}> - </button>
                            <span>{product.quantity}</span>
                            <button onClick={() => increment(product._id)}> + </button>
                        </div>

                        <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
                    </div>

                </div>

            ))
        }

        <div className="total">
          <h3>Total: $ {total}</h3>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons 
                
                style={style}

                fundingSource={"paypal"}

                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: total,
                            },
                        },],
                    })
                    .then((orderId) => {
                        return orderId
                    })
                }}

                onApprove={(data, actions) => {
                    return actions.order.capture().then((data) => {
                        
                        addPayment(data)

                    })
                }}

                onCancel={(data) => {
                    console.log('The payment was cancelled!', data)
                }}

                onError={(err) => {
                    console.log("Error!", err)
                }}
            
            />
          </PayPalScriptProvider>
        </div>
    </div>
  )
}
