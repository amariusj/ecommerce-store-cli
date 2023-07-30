import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

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

  // Run this function when hitting the submit button
  const loginSubmit = async e => {

    // Prevent the page from re-loading
    e.preventDefault()

    try {
      // Post to the api with the current user state as the
      // request body. So it should look like:
      // {
      //    email: amarius@amariusjones.com
      //    password: 12345678 
      // }
      await axios.post('/user/login', {...user})

      // localStorage is a property of the window that allows you to
      // access a storage object for the document's origin; the stored
      // data is saved across browser sessions. setItem adds a data item to
      // the storage object
      localStorage.setItem('firstLogin', true)

      // redirect the window to the following URL, which in this case is
      // the home page
      window.location.href = "/"

    } catch (err) {

      // if there's an error from the server, pop an alert and show
      // the message there
      alert(err.response.data.msg)
      console.log(err)

    }
  }

  return (
    <div className="login-page">

      <form onSubmit={loginSubmit}>

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
