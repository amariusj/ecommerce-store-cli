import React, {useContext, useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/product_item/ProductItem'

const DetailProduct = () => {

    // Grab the URL parameters
    const params = useParams()

    // Grab the context from the Global State
    const state = useContext(GlobalState)

    // Grab the products from the context's state
    const [products] = state.productsAPI.products

    // Create a state variable for the detailed product
    const [detailProduct, setDetailProduct] = useState([])

    // Grab add cart function from state
    const addCart = state.userAPI.addCart

    // Use effect to run a function upon the component loading that'll
    // search through the products array for the product who's ID
    // matches the parameter of the page. This function will reload if
    // either the parameter or the products variables update/change
    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    // ensure that if the detailed product cannot be found with the parameter
    // then the component does not render and an error is shown instead.
    // This helps if someone directs themselves to a page that no longer
    // exists but used to be a product page in the past. Their cache could have
    // saved the page. Without this, it'll try to load the component
    if (detailProduct.length === 0) return null

    return(
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>{detailProduct.product_id}</h6>
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" onClick={() => addCart(detailProduct)}
                    className="cart">Buy Now</Link>
                </div>
            </div>

            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category && product._id !== params.id
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
