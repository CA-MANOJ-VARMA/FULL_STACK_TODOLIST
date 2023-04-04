import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './index.css'

const MyBlogs = () => {

  const [myBlogs,setmyBlogs] = useState([])
  const [count,setCount] = useState(0)
  const userId = localStorage.getItem('userId')

  console.log('All Blogs')

  const blogFetch = async () =>{
    console.log('blog fetch function')
    try {
      console.log('blog fetch try function')
      const {data} = await axios.get(`/api/v1/blog/user-blog/${userId}`)
      console.log(data)
      if (data.success){
       setmyBlogs(data.userBlog.blogs) 
       setCount(data.userBlog.blogs.length)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    blogFetch()
  },[])
  console.log(myBlogs)
  return (
    <ul className='css-all-blogs-container'>
      {count!=0 ?
        (myBlogs.map(eachBlog =>
          <li key={eachBlog._id}>
            <div className='css-eachBlog-container'>
            {userId===eachBlog.user && 
            <div className='d-flex justify-content-end css-edit-delete-container'>
              <Link to={`/edit-blog/${eachBlog._id}`}>
                <button type='button' className='btn btn-primary mr-3'>Edit</button>
                </Link>
                <button type='button' className='btn btn-danger'>Delete</button>
              </div>
                } 
              <h3>{eachBlog.title}</h3>
              <img src={eachBlog.image} alt={eachBlog.title} className='css-blog-image-itself'/>
              <p>{eachBlog.description}</p>
            </div>
          </li>
        )):(<p>You Have No Blogs Written</p>)
        
      }
    {/* <p>Hello</p> */}
    </ul>
  )
}

export default MyBlogs