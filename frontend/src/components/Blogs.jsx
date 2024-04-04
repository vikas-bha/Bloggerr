import React, { useEffect, useState } from 'react'
import "../styles/Blogs.css";
import { useNavigate } from 'react-router-dom';
const Blogs = () => {

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
  
    useEffect(()=>{
      const fetchBlogs = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/v1/blogs/bulk', {
            method : "GET", 
            headers : {
              "token" : sessionStorage.getItem("token")
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch blogs');
          }
          const data = await response.json();
          
          setBlogs(data.blogs);
        } catch (error) {
          console.error('Error fetching blogs:', error.message);
        }
      };
  
      fetchBlogs();


    },[])
    const handleLogout = async () => {
        // Your logout logic here
        console.log('Logged out');
        const response = await fetch('http://localhost:5000/api/v1/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
        });

        console.log(response.data);
        navigate("/");

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
        <h1>All Blogs could be seen here</h1>

            {/* <div className="list">
    bloglist
            </div> */}
                <div className="list">
                {blogs?.map(blog => (
                    <div className="blog-outer">
                        <div key={blog._id}  className="blog" onClick={() => handleBlogClick(blog._id)}>
                        <h2>{blog.title}</h2>
                        <p>{blog.body}</p>
                        {blog.coverImageURL && <img  width ="100%" src={blog.coverImageURL} alt="Cover Image" />}
                        <p>Created By: {blog.createdBy}</p>
                        <p>Comments: {blog?.comments?.length}</p>
                    </div>
                    </div>
                ))}
                </div>

    </div>



    </div>
  )
}

export default Blogs