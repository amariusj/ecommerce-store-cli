import React, { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

export default function Categories() {

    const state = useContext(GlobalState)
    const [categories] = state.categoryAPI.categories
    const [token] = state.token
    const [callback, setCallback] = state.categoryAPI.callback

    const [category, setCategory] = useState('')
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async (e) => {

        e.preventDefault()

        try {

            if (onEdit) {

                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)

            } else {

                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)

            }

            setOnEdit(false)
            setCategory('')
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }

    }

    const editCategory = async (id, name) => {

        try {

            setID(id)
            setCategory(name)
            setOnEdit(true)

        } catch (err) {

            alert(err.response.data.msg)

        }

    }

    const deleteCategory = async (id) => {

        try {

            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })

            alert(res.data.msg)
            setCallback(!callback)

        } catch (err) {

            alert(err.response.data.msg)

        }

    }

    return (
        <div className="categories">

            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} />

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

            <div className="col">

                {
                    categories.map(category => {

                        return (

                            <div className='row' key={category._id}>
                                <p>{category.name}</p>
                                <div>
                                    <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                    <button onClick={() => deleteCategory(category._id)}>Delete</button>
                                </div>
                            </div>

                        )

                    })
                }

            </div>

        </div>
    )
}
