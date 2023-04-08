import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const EditBlog = (props) => {
    const [inputs, setInputs] = useState({
        title:'',
        description:'', 
        image:''
    })
    const userId = localStorage.getItem('userId')
    const jwtToken = localStorage.getItem('jwtToken')
    const {match} = props
    const {params} = match
    const {id } = params
    console.log(id)


    const eventChangeFunction = (event) => {
        setInputs(prevState => ({
            ...prevState,
            [event.target.name] :  event.target.value}))
    }

    const getBlogById = async() =>{
        try {
            const {data} = await axios.get(`/api/v1/blog/get-blog/${id}`,{headers: {
                'authorization':`Bearer ${jwtToken}`
            }})
            const {blog} = data
            // console.log(blog)
            setInputs({title:blog.title,description:blog.description,image:blog.image})
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getBlogById()
    },[id])

    const editBlogFunction = async (event) =>{
        event.preventDefault()

        console.log(inputs) 
        try {
            const response = await axios.put(`/api/v1/blog/update-blog/${id}` , {title:inputs.title,description:inputs.description, image:inputs.image,user:userId},{headers: {
                'authorization':`Bearer ${jwtToken}`
            }})
            console.log('top')
            console.log(response)
            console.log('bottom')
            if (response.data.success){
                console.log('Hello')
                const {history} = props
                console.log(props)
                alert('Blog Updated Successfully')
                history.replace('/')
            }
            console.log(response)
        } catch (error) {
            
        }
    }


    console.log(inputs)

    return (
    <div>
        <form className='css-form-container' 
        onSubmit={editBlogFunction}
        >
        <h1>EDIT BLOG</h1>
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
        
        <button className='css-Register-Page-button' type='submit'>UPDATE</button>
        
    </form>
    </div>
  )
}

export default EditBlog