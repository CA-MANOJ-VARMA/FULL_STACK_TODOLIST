import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './index.css'

const CreateBlog = (props) => {
    const [inputs, setInputs] = useState({
        title:'',
        description:'', 
        image:''
    })
    const [erroMsg,seterrorMsg]  =useState('')
    const userId = localStorage.getItem('userId')
    const eventChangeFunction = (event) => {
        setInputs(prevState => ({
            ...prevState,
            [event.target.name] :  event.target.value}))
    }


    const submitRegisterFunction = async (event) =>{
        event.preventDefault()
        
        console.log(inputs) 
        try {
            const response = await axios.post('/api/v1/blog/create-blog' , {title:inputs.title,description:inputs.description, image:inputs.image,user:userId})
            console.log('top')
            console.log(response)
            console.log('bottom')
            if (response.data.success){
                console.log('Hello')
                const {history} = props
                console.log(props)
                alert('Blog Posted Successfully')
                history.replace('/')
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
        <h1>CREATE BLOG</h1>
        <div className='d-flex flex-column css-input-container'>
            <label htmlFor='title' className='css-label-input-itself'>TITLE</label>
            <input type='text' placeholder='Enter Title' id='title' name='title' className='css-input-itself' onChange={eventChangeFunction} value={inputs.title}/>
        </div>
        <div className='d-flex flex-column css-input-container'>
            <label htmlFor='description' className='css-label-input-itself'>DESCRIPTION</label>
            <textarea type='text' placeholder='Enter Description' id='description'  name='description' className='css-textarea-itself' onChange={eventChangeFunction} value={inputs.description}/>
        </div>
        <div className='d-flex flex-column css-input-container'>
            <label htmlFor='image' className='css-label-input-itself'>IMAGE</label>
            <input type='text' placeholder='Enter User Name' id='image' className='css-input-itself' name='image' onChange={eventChangeFunction} value={inputs.image}/>
        </div>
        
        <button className='css-Register-Page-button' type='submit'>POST</button>
        
    </form>
    {erroMsg!=='' && <p>{erroMsg}</p>}
    </div>
  )
}

export default CreateBlog