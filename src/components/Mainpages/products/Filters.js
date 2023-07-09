import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

export default function Filters() {

    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [categories] = state.categoriesAPI.categories

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filter: </span>
                <select name="category" >

                </select>
            </div>
        </div>
    )
}
