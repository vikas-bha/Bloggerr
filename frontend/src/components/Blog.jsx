import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles/Blog.css"

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    // let creatingUser ;
    const [creatingUser, setCreatingUser] = useState(null);

    


    useEffect(() => {
        fetchBlog(id);
        fetchUser();
    }, [id, userId]);

    const fetchBlog = async (id) => {
        // Fetch blog data based on the ID
        try {
            const response = await fetch(`http://localhost:5000/api/v1/blogs/${id}` , {
                method : "GET", 
                headers : {
                  "token" : sessionStorage.getItem("token")
                }
            });
            const data = await response.json();
            console.log("showing from the blog.jsx ", data.blog)
           setUserId(data.blog.createdBy);
           console.log("this is the userId we need",userId)
            setBlog(data.blog);
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    const fetchUser = async()=>{
        try {
            console.log(userId);
            const response = await fetch(`http://localhost:5000/api/v1/users/${userId}` , {
                method : "GET", 
                headers : {
                  "token" : sessionStorage.getItem("token")
                }
        })

        const data = await response.json();
        console.log("data from the fetchUser funtion", data.user.fullName)
        // creatingUser= data.user.fullName;
        setCreatingUser(data.user.fullName)
        console.log(creatingUser);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

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
   
   <span onClick={()=>navigate("/bulk")} className='navbar-left'>Blogger</span>
     <span onClick={()=>navigate("/create")} className='publish'>Wish to Write something ?</span>

   <div className="navbar-right">
   <button  onClick={handleLogout}>Logout</button>

   </div>
 </nav>
            {blog ? (
                    <div className="blog-outer-contaier">
                                        <div className='Blog-container'>
                        <div className='blog-inside-container'>
                        <h1 style={{color:"black"}}>{blog.title}</h1>
                    <p>{blog.body}</p>
                    {blog.coverImageURL && <img width="100%" src={blog.coverImageURL} alt="Cover Image" />}
                    <p>Created By: {creatingUser}</p>
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
