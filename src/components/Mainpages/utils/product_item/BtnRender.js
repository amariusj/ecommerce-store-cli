import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

export default function BtnRender({product, deleteProduct}) {

    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    return (
            <div className="row_btn">
                {
                    isAdmin ? 
                    <>
                        <Link id="btn_buy" to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)} >
                            Delete
                        </Link>
                        <Link id="btn_view" to={`https://still-dawn-57401-b5963556d2d4.herokuapp.com/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </>
                    :
                    <>
                        <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                            Buy
                        </Link>
                        <Link id="btn_view" to={`https://still-dawn-57401-b5963556d2d4.herokuapp.com/detail/${product._id}`}>
                            View
                        </Link>
                    </>
                }
            </div>
    )
}
