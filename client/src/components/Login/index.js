import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {authAction} from '../../redux/store'
import axios from 'axios'

import './index.css'

const Login = (props) => {
    const [inputs, setInputs] = useState({
        email:'', 
        password:''
    })
    const dispatch = useDispatch()
    
    const eventChangeFunction = (event) => {
        setInputs(prevState => ({
            ...prevState,
            [event.target.name] :  event.target.value}))
    }


    const submitRegisterFunction = async (event) =>{
        event.preventDefault()
        
        console.log(inputs) 
        try {
            
            const response = await axios.post('/api/v1/user/login' , {email:inputs.email, password:inputs.password})
            console.log(response.data)
            if (response.data.success){
                console.log('Hello')
                const {history} = props
                console.log(props)
                dispatch(authAction.login())
                alert('Login Successful')
                history.replace('/')
                localStorage.setItem('userId',response.data.user._id)
                localStorage.setItem('jwtToken',response.data.token)
            }
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center css-register-div-container'>
    <form className='css-form-container' onSubmit={submitRegisterFunction}>
        <h1>LOGIN</h1>
        <div className='d-flex flex-column css-input-container'>
            <label htmlFor='email' className='css-label-input-itself'>EMAIL</label>
            <input type='text' placeholder='Enter Your Email' id='email'  name='email' className='css-input-itself' onChange={eventChangeFunction} value={inputs.email}/>
        </div>
        <div className='d-flex flex-column css-input-container'>
            <label htmlFor='password' className='css-label-input-itself'>PASSWORD</label>
            <input type='password' placeholder='Enter User Name' id='password' className='css-input-itself' name='password' onChange={eventChangeFunction} value={inputs.password}/>
        </div>
        
        <button className='css-Register-Page-button' type='submit'>Login</button>
        
    </form>
    <Link to='/register'>
    <p>Not yet Registered? Click Here to Register</p>
    </Link>
    </div>
  )
}

export default Login