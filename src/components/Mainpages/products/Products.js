import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/product_item/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'

export default function Products() {

  const state = useContext(GlobalState)
  const [products, setProducts] = state.productsAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.productsAPI.callback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)


  const handleCheck = (id) => {
    
    products.forEach( product => {
      if (product._id === id) product.checked = !product.checked
    })

    setProducts([...products])

  }

  const checkAll = () => {

    let tally = 0

    products.forEach( product => {

        if (product.checked === true) tally += 1;

    })

    if (tally === products.length && isCheck === true) {

      products.forEach( product => {
        product.checked = !product.checked
      })

    } else {

      products.forEach( product => {
        if (product.checked === false) product.checked = !product.checked
      })

    }

    setProducts([...products])
    setIsCheck(!isCheck)

  }


  const deleteProduct = async (id, public_id) => {

    try {

      setLoading(true)

      const destroyImg = axios.post('https://www.everythingiswater.com/api/destroy', {public_id}, {
        headers: {Authorization: token}
      })

      const deleteProduct = axios.delete(`https://www.everythingiswater.com/api/products/${id}`, {
        headers: {Authorization: token}
      })

      await destroyImg
      await deleteProduct

      setCallback(!callback)
      setLoading(false)

    } catch (err) {

      alert(err.response.data.msg)

    }

  }

  const deleteAll = () => {
    products.forEach(product => {
      if (product.checked) deleteProduct(product._id, product.images.public_id)
    })
  }

  if (loading) return <div><Loading /></div>
  if (!products) return <div><Loading /></div>


  return (
    <>
    {
      isAdmin &&
      <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete All</button>
      </div>
    }
    <div className="products">
      {
        products.map(product => {
          return <ProductItem key={product._id} product={product} 
          isAdmin={isAdmin} deleteProduct={deleteProduct}
          handleCheck={handleCheck} />
        }) 
      }
    </div>
    {products.length === 0 && <Loading />}
    </>
  )
}
