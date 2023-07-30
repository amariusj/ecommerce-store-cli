import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

export default function Login() {

  // Import Context and loginSubmit function from UserAPI
  const state = useContext(GlobalState)
  const loginSubmit = state.userAPI.loginSubmit

  // Create the state to hold the user information submitted
  // from the form
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  // Allow users to update the input elements. The value of each
  // input element is equal to the user state's email and password
  // properties
  const onChangeInput = e => {
    // Grab the name and value attributes of the input element being
    // changed/focused
    const {name, value} = e.target

    // Take the current user state and update it to what is being
    // entered in the field (email or password)
    setUser({...user, [name]:value})
  }


  return (
    <div className="login-page">

      <form onSubmit={(e) => loginSubmit(e, user)}>

        <h2>Login</h2>

        <input type="email" name="email" required 
        placeholder="Email" value={user.email}
        onChange={onChangeInput} />

        <input type="password" name="password" required
        placeholder="Password" value={user.password}
        onChange={onChangeInput} />

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/signup">Sign Up</Link>
        </div>

      </form>
    </div>
  )
}
