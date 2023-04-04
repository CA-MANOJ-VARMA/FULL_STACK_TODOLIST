import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './index.css'

const Register = (props) => {
    const [inputs, setInputs] = useState({
        username:'',
        email:'', 
        password:''
    })
    const [erroMsg,seterrorMsg]  =useState('')
    
    const eventChangeFunction = (event) => {
        setInputs(prevState => ({
            ...prevState,
            [event.target.name] :  event.target.value}))
    }


    const submitRegisterFunction = async (event) =>{
        event.preventDefault()
        
        console.log(inputs) 
        try {
            const response = await axios.post('/api/v1/user/register' , {username:inputs.username,email:inputs.email, password:inputs.password})
            console.log('top')
            console.log(response)
            console.log('bottom')
            if (response.data.success){
                console.log('Hello')
                const {history} = props
                console.log(props)
                alert('User Registerd Successfully')
                history.replace('/login')
            }
            console.log(response)
            seterrorMsg({erroMsg:response.data.message})
        } catch (error) {
            
        }
    }
    console.log()
  return (
    <div className='d-flex flex-column justify-content-center align-items-center css-register-div-container'>
    <form className='css-form-container' onSubmit={submitRegisterFunction}>
        <h1>REGISTER</h1>
        <div className='d-flex flex-column css-input-container'>
            <label htmlFor='username' className='css-label-input-itself'>USERNAME</label>
            <input type='text' placeholder='Enter User Name' id='username' name='username' className='css-input-itself' onChange={eventChangeFunction} value={inputs.username}/>
        </div>
        <div className='d-flex flex-column css-input-container'>
            <label htmlFor='email' className='css-label-input-itself'>EMAIL</label>
            <input type='text' placeholder='Enter Your Email' id='email'  name='email' className='css-input-itself' onChange={eventChangeFunction} value={inputs.email}/>
        </div>
        <div className='d-flex flex-column css-input-container'>
            <label htmlFor='password' className='css-label-input-itself'>PASSWORD</label>
            <input type='password' placeholder='Enter User Name' id='password' className='css-input-itself' name='password' onChange={eventChangeFunction} value={inputs.password}/>
        </div>
        
        <button className='css-Register-Page-button' type='submit'>Register</button>
        
    </form>
    {erroMsg!=='' && <p>{erroMsg}</p>}
    <Link to='/login'>
    <p>Already Register? Click Here to Login</p>
    </Link>
    </div>
  )
}

export default Register