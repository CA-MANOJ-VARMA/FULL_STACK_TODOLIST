import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './index.css'

const AllBlogs = (props) => {

  const [blogs,setBlogs] = useState([])
  const [count,setCount] = useState(0)
  const userId = localStorage.getItem('userId')

  console.log('All Blogs')

  const blogFetch = async () =>{
    console.log('blog fetch function')
    try {
      console.log('blog fetch try function')
      const {data} = await axios.get('/api/v1/blog/all-blog')
      // console.log(responseBlog)
      if (data.success){
       setBlogs(data.blogs) 
       setCount({count:data.BlogCount})
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    blogFetch()
  },[])
  console.log(blogs)

  const deleteBlogFunction = async (id) =>{
    console.log('Delete')
    try {
      const {data} = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
      if(data.success){
        // const {history} = props
        alert('Blog Deleted Successfully')
        blogFetch()
      }
   

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ul className='css-all-blogs-container'>
      {count!=0 ?
        (blogs.map(eachBlog =>
          <li key={eachBlog._id}>
            <div className='css-eachBlog-container'>
            {userId===eachBlog.user && 
            <div className='d-flex justify-content-end css-edit-delete-container'>
                <Link to={`/edit-blog/${eachBlog._id}`}>
                <button type='button' className='btn btn-primary mr-3'>Edit</button>
                </Link>
                <button type='button' className='btn btn-danger' onClick={()=>deleteBlogFunction(eachBlog._id)}>Delete</button>
              </div>
                } 
              <h3>{eachBlog.title}</h3>
              <img src={eachBlog.image} alt={eachBlog.title} className='css-blog-image-itself'/>
              <p>{eachBlog.description}</p>
            </div>
          </li>
        )):(<p>No Blogs Found</p>)
        
      }

    </ul>
  )
}

export default AllBlogs