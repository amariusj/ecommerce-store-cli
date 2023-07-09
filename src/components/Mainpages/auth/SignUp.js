import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SignUp() {

  // Create a state to hold the field data
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Create a function to update the fields/input elements
  const onChangeInput = e => {

    const {name, value} = e.target

    setUser({
      ...user,
      [name]:value
    })

  }

  // Submit data to API
  const onSubmit = async e => {

    // Prevent the page from reloading upon submit
    e.preventDefault()

    try {

      // Post to the API the new user data
      await axios.post('https://www.everythingiswater.com//user/register', {...user})

      // Log the user has logged in
      localStorage.setItem('firstLogin', true)

      // Redirect user to home page
      window.location.href = "/"

    } catch (err) {

      // If error, alert client to the error
      alert(err.response.data.msg)

    }

  }

  return (
    <div className="login-page">

      <form onSubmit={onSubmit}>

        <h2>Sign Up</h2>

        <input type="text" name="firstname" required 
        placeholder='firstname' value={user.firstname}
        onChange={onChangeInput} />

        <input type="text" name="lastname" required 
        placeholder='lastname' value={user.lastname}
        onChange={onChangeInput} />

        <input type="email" name="email" required 
        placeholder='your@email.com' value={user.email}
        onChange={onChangeInput} />

        <input type="password" name="password" required 
        placeholder='password' value={user.password}
        onChange={onChangeInput} />

        <input type="password" name="confirmPassword" required 
        placeholder='confirm password' value={user.confirmPassword}
        onChange={onChangeInput} />

        <div className="row">
          <button type="submit">Submit</button>
          <Link to="/login">Login</Link>
        </div>

      </form>

    </div>
  )
}
