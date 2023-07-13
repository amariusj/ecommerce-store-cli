import React, { useState } from 'react'
import BtnRender from './BtnRender'
import Loading from '../loading/Loading'

export default function ProductItem({product, isAdmin, deleteProduct, handleCheck }) {

  const [loading, setLoading] = useState(true)
  const imgStyle = loading ? { display: "none" } : {}

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <div className="product_card">

        {
            isAdmin && <input type="checkbox" checked={product.checked} onChange={() => handleCheck(product._id)} />
        }

        { loading && <Loading /> }
        <img src={product.images.url} style={imgStyle} onLoad={handleImageLoad} alt="" />

        <div className="product_box">
            <h2 title={product.title}>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
        </div>

        <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  )
}
