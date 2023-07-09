import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

export default function CreateProduct() {


    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoryAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const navigate = useNavigate()
    const params = useParams()
    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    const styleUpload = {
        display: images ? "block" : "none"
    }

    useEffect(() => {

        if (params.id) {

            if (products.length === 0) navigate('/')

            products.forEach( product => {

                if (product._id === params.id) {

                    setOnEdit(true)
                    setProduct(product)
                    setImages(product.images)

                }


            })

        } else {

            setOnEdit(false)
            setProduct(initialState)
            setImages(false)

        }

    },[params.id, products, navigate])

    const handleUpload = async (e) => {

        try {

            if (!isAdmin) return alert("Service Denied. You are not an Administrator.")

            const file = e.target.files[0]

            if (!file) return alert("File does not exist.")

            if (file.size > 1024 * 1024 * 5) // 5mb
                return alert("Image is too large.")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg')
                return alert('File format is not supported.')

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)

            const res = await axios.post('https://www.everythingiswater.com/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: token
                }
            })

            setLoading(false)

            setImages(res.data)

        } catch (err) {

            alert(err.response.data.msg)

        }

    }

    const handleDestroy = async () => {

        try {

            if (!isAdmin) return alert("Service Denied. You are not an Administrator")

            setLoading(true)

            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })

            setLoading(false)

            setImages(false)

        } catch (err) {

            alert(err.response.data.msg)

        }

    }

    const handleChangeInput = (e) => {

        const {name, value} = e.target
        setProduct({...product, [name]: value})

    }

    const handleSubmit = async e => {

        e.preventDefault()

        try {

            if (!isAdmin) return alert("Service Denied. You are not an Administrator.")

            if (!images) return alert("Please add an image to your product.")

            if (onEdit) {

                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })

            } else {

                await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })

            }


        } catch (err) {

            return alert(err.response.data.msg)

        }

        setCallback(!callback)
        navigate('/')

    }
        
    return (
        <div className="create_product">

            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />

                {

                    loading ? <div id="file_img"><Loading /></div> :

                    <div id="file_img" style={styleUpload} >
                        <img src={images ? images.url : ''} alt="" />
                        <span onClick={handleDestroy}>x</span>
                    </div>

                }

            </div>

            <form onSubmit={handleSubmit}>

                <div className="row">
                    <label htmlFor="product_id">Product Id</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={product._id} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} onChange={handleChangeInput} rows="5" />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} onChange={handleChangeInput} row="7" />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => {
                                return(
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

        </div>
    )
}
