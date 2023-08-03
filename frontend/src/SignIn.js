import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Validation  from './LoginValidation'
import axios from 'axios'

export default function SignIn() {
  const navigate = useNavigate();
  const [values, setValues ] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    
  })

  const handleInput = (event) =>{
    setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
  }

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:8081')
        .then(res => {
            if(res.data.valid){
              navigate('/')
            }
            else {
                navigate('/signin')
            }
        })
        .catch(err => {
            console.log(err);
        })
}, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/signin', values)
    .then(res=>{
      if(res.data.Login){
        navigate('/')
      }
      else{
        alert("No record")
      }
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email'><strong>Email</strong></label>
              <input onChange={handleInput} type='email' placeholder='Enter Email' className='form-control rounded-0' name="email"/>
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password'><strong>Password</strong></label>
              <input onChange={handleInput} type='password' placeholder='Enter Password' className='form-control rounded-0' name='password'/>
              {errors.password && <span className='text-danger'>{errors.password}</span>}

            </div>
            <button type="submit" className='btn btn-success'><strong>Sign In</strong></button>
            <p>You agree to our terms and conditions?</p>
            <Link to="/signup">Create Account</Link>
        </form>
      </div>
    </div>
  )
}
