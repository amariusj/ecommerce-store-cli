import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

export default function Filters() {

    const state = useContext(GlobalState)
    const [setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [categories] = state.categoryAPI.categories

    const handleCategory = (e) => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">

            <div className="row">
                <span>Filter: </span>
                <select onChange={handleCategory} name="category" >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder='Enter your search!'
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sor=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: High-to-Low</option>
                    <option value='sort=price'>Price: Low-To-High</option>
                </select>
            </div>

        </div>
    )
}
