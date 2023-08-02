import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignUpValidationForm';
import axios from 'axios';

function SignUp() {

  const navigate = useNavigate()
  const [values, setValues ] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({

  })

  const handleInput = (event) =>{
    setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/signup', values)
    .then(res=> {
      console.log(res)
      navigate('/')
    })
    .catch((err)=>console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-Up</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='name'><strong>Name</strong></label>
              <input onChange={handleInput} type='text' placeholder='Enter Name' className='form-control rounded-0' name="name"/>
              {<span className='text-danger'>{errors.name}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='email'><strong>Email</strong></label>
              <input onChange={handleInput} type='email' placeholder='Enter Email' className='form-control rounded-0' name="email" />
              {<span className='text-danger'>{errors.name}</span>}

            </div>
            <div className='mb-3'>
              <label htmlFor='password'><strong>Password</strong></label>
              <input onChange={handleInput} type='password' placeholder='Enter Password' className='form-control rounded-0' name="password" />
              {<span className='text-danger'>{errors.name}</span>}

            </div>
            <div className='mb-3'>
              <label htmlFor='confirm-password'><strong>Confirm Password</strong></label>
              <input onChange={handleInput} type='password' placeholder='Confirm Password' className='form-control rounded-0' name="confirm-password"/>
              {<span className='text-danger'>{errors.name}</span>}

            </div>
            <button type="submit" className='btn btn-success'><strong>Sign Up</strong></button>
            <p>You agree to our terms and conditions?</p>
            <Link to="/">Sign In</Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp;