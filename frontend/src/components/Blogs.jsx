import React, { useEffect, useState } from 'react'
import "../styles/Blogs.css";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../UserContext"
import LoginFirst from './LoginFirst';
const Blogs = () => {

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const { user, setUser } = useUser();


  
    useEffect(()=>{
      console.log("this user is coming from the blogs.jsx component", user);
      
      const fetchBlogs = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/v1/blogs/bulk', {
            method: 'GET',
            headers: {
              'token': sessionStorage.getItem('token')
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch blogs');
          }
          const data = await response.json();
          console.log('Data fetched:', data);
          const blogsWithAuthors = await Promise.all(
            data.blogs.map(async (blog) => {
              const userResponse = await fetch(`http://localhost:5000/api/v1/users/${blog.createdBy}`, {
                method: 'GET',
                headers: {
                  'token': sessionStorage.getItem('token')
                }
              });
              const userData = await userResponse.json();
              return {
                ...blog,
                createdBy: userData.user.fullName // Assuming the user object has a "fullName" property
              };
            })
          );
          console.log('BlogsWithAuthors:', blogsWithAuthors);
          setBlogs(blogsWithAuthors);
        } catch (error) {
          console.error('Error fetching blogs:', error.message);
        }
      };
      
  
      if(user){
        fetchBlogs();
       

      }


    },[user,setUser])
  

    const handleLogout = async () => {
      try {
          console.log('Logging out');
          const response = await fetch('http://localhost:5000/api/v1/users/logout', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              // No need to send a body for a logout request
          });
  
          if (!response.ok) {
              throw new Error('Failed to logout');
          }
  
          console.log('Logout successful');
          // Clear user data from sessionStorage
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
  
          navigate("/");
      } catch (error) {
          console.error('Error logging out:', error.message);
          // Handle error, e.g., show error message to user
      }
  };
  

  
    
      const handleBlogClick = (blogId) => {
        // Handle blog click logic here, e.g., open the blog post
        console.log(`Clicked on blog with ID: ${blogId}`);
        navigate(`/blogs/${blogId}`);
    };
  return (
    <div className='blogs'>
               <nav className="navbar">
   
      <span className='navbar-left'>Blogger</span>
        <span onClick={()=>navigate("/create")} className='publish'>Wish to Write something ?</span>

      <div className="navbar-right">
      <button  onClick={handleLogout}>Logout</button>

      </div>
    </nav>

    <div className="blog-list">
        <h1 style={{color: "olive"}}>All Blogs could be seen here</h1>

         
               <>
               {user ? (               <div className="list">
                {blogs?.map(blog => (
                    <div className="blog-outer">
                        <div key={blog._id}  className="blog" onClick={() => handleBlogClick(blog._id)}>
                        <h2>{blog.title}</h2>
                        <p>{blog.body}</p>
                        {blog.coverImageURL ? <img  width ="100%" src={blog.coverImageURL} alt="Cover" /> : <></>}
                        <p>Created By: {blog.createdBy}</p>
                        <p>Comments: {blog?.comments?.length}</p>
                    </div>
                    </div>
                ))}
                </div>): <LoginFirst/>}

               </>

    </div>



    </div>
  )
}

export default Blogs