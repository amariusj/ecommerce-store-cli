import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

// Import API Request functional components from API folder
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoryAPI from './api/CategoryAPI'

/*
 ----- CONTEXT -----

 Usually, you will pass information from a parent component
  to a child component via props. But passing props can become 
  verbose and inconvenient if you have to pass them through 
  many components in the middle, or if many components in your 
  app need the same information. Context lets the parent component 
  make some information available to any component in the tree below 
  it—no matter how deep—without passing it explicitly through props.
*/

// First, create the context and export it 
export const GlobalState = createContext()

export const DataProvider = ({children}) => {

    const [token, setToken] = useState(false)

    useEffect(() => {

        const firstLogin = localStorage.getItem('firstLogin')

        if (firstLogin) {

            const refreshToken = async () => {

                try {
        
                // Grab the refresh token
                const res = await axios.get('https://www.everythingiswater.com//user/refresh_token')
                        
        
                // Add the token to the state for the client
                setToken(res.data.accessToken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
        
                } catch (err) {
        
                    if (err) alert(err.response.data.msg)
        
                }   
                
            }
    
            refreshToken()

        }

    }, [])

    const state = {
        productsAPI: ProductsAPI(),
        token: [token, setToken],
        userAPI: UserAPI(token),
        categoryAPI: CategoryAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}