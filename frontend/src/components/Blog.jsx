import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles/Blog.css"

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlog(id);
    }, [id]);

    const fetchBlog = async (id) => {
        // Fetch blog data based on the ID
        try {
            const response = await fetch(`http://localhost:3000/api/v1/blogs/${id}` , {
                method : "GET", 
                headers : {
                  "token" : sessionStorage.getItem("token")
                }
            });
            const data = await response.json();

            setBlog(data.blog);
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

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


    return (
        <div className='blog-post'>

<nav className="navbar">
   
   <span className='navbar-left'>Blogger</span>
     <span onClick={()=>navigate("/create")} className='publish'>Wish to Write something ?</span>

   <div className="navbar-right">
   <button  onClick={handleLogout}>Logout</button>

   </div>
 </nav>
            {blog ? (
                    <div className="blog-outer-contaier">
                                        <div className='Blog-container'>
                        <div className='blog-inside-container'>
                        <h1>{blog.title}</h1>
                    <p>{blog.body}</p>
                    {blog.coverImageURL && <img width="100%" src={blog.coverImageURL} alt="Cover Image" />}
                    <p>Created By: {blog.createdBy}</p>
                    <h2>Comments:</h2>
                    <ul>
                        {blog.comments?.map(comment => (
                            <li key={comment._id}>{comment.text}</li>
                        ))}
                    </ul>
                        </div>
                </div>
                    </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Blog;
