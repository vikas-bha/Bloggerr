import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../styles/Blog.css"
import Comments from './Comments';
import { useUser } from '../UserContext';
import LoginFirst from './LoginFirst';


const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    // let creatingUser ;
    const [creatingUser, setCreatingUser] = useState(null);
    const [comment, setComment] = useState({ text : ''});
    const { user, setUser } = useUser();

    


    useEffect(() => {
        fetchBlog(id);
        fetchUser();
    }, [id, userId]);

   

    const fetchBlog = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/blogs/${id}`, {
                method: "GET",
                headers: {
                    "token": sessionStorage.getItem("token")
                }
            });
            const data = await response.json();
            // console.log("showing from the blog.jsx ", data.blog)
            setUserId(data.blog.createdBy);
            // console.log("this is the userId we need", userId)
    
            // Fetch user details for each comment
            const updatedComments = await Promise.all(data.blog.comments.map(async (comment) => {
                const commentResponse = await fetch(`http://localhost:5000/api/v1/comments/${comment}`, {
                    method: "GET",
                    headers: {
                        "token": sessionStorage.getItem("token")
                    }
                });
                const commentData = await commentResponse.json();
                // console.log("here we are trying to console the commentData the ids of tghe comments",commentData, commentData.comment.postedBy)
                // const userResponse = await fetch(`http://localhost:5000/api/v1/users/${commentData.comment.postedBy}`, {
                //     method: "GET",
                //     headers: {
                //         "token": sessionStorage.getItem("token")
                //     }
                // });
                // const userData = await userResponse.json();
                // console.log("line number 65 userData", userData);
                
                return {
                    // _id: comment._id,
                    blogId:id,
                    _id: commentData.comment._id,
                    text: commentData.comment.text,
                    // postedBy: userData.user.fullName,
                    postedBy: commentData.comment.postedBy,
                    replies : commentData.comment.replies
                };
            }));
    
            const updatedBlog = { ...data.blog, comments: updatedComments };
            setBlog(updatedBlog);
            return updatedBlog;
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };
    
    

    const fetchUser = async()=>{
        try {
            // console.log(userId);
            const response = await fetch(`http://localhost:5000/api/v1/users/${userId}` , {
                method : "GET", 
                headers : {
                  "token" : sessionStorage.getItem("token")
                }
        })

        const data = await response.json();
        // console.log("data from the fetchUser funtion", data.user.fullName)
        // creatingUser= data.user.fullName;
        setCreatingUser(data.user.fullName)
        // console.log(creatingUser);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const handleLogout = async () => {
        // Your logout logic here
        // console.log('Logged out');
        const response = await fetch('http://localhost:5000/api/v1/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
        });

        // console.log(response.data);
        navigate("/");

      };

      const handleCommentChange = (e)=>{
        setComment({ text: e.target.value });        
        // console.log(comment);
      }

      const submitComment = async ()=>{
        console.log(comment);
        try {
            const response = await fetch(`http://localhost:5000/api/v1/blogs/comment/${blog._id}`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    "token" : sessionStorage.getItem("token")
                  },
              //   headers: {
              //     'Content-Type': 'application/json',
              //     'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Include the JWT token in the Authorization header
              // },
                body: JSON.stringify(comment),
            });

            const data = await response.json();
            // console.log(data);
            alert("comment created sucessfully")
            fetchBlog(id);
    
        } catch (error) {
            console.log("error while posting comment", error)
            
        }


      }
    return (
        <div className='blog-post'>

<nav className="navbar">
   
   <span onClick={()=>navigate("/bulk")} className='navbar-left'>Blogger</span>
     <span onClick={()=>navigate("/create")} className='publish'>Wish to Write something ?</span>

   <div className="navbar-right">
   <button  onClick={handleLogout}>Logout</button>

   </div>
 </nav>
{
    user ?  <>
                {blog ? (
                    <div className="blog-outer-contaier">
                                        <div className='Blog-container'>
                        <div className='blog-inside-container'>
                        <h1 style={{color:"black"}}>{blog.title}</h1>
                    <p>{blog.body}</p>
                    {blog.coverImageURL && <img width="100%" src={blog.coverImageURL} alt="Cover Image" />}
                    <p>Created By: {creatingUser}</p>
                        <div className="comment-box">
                            <input placeholder='Post your comment' onChange={handleCommentChange} required/>
                            <button onClick={submitComment} >Post</button>
                        </div>
                   <div className="comments-box">
                   <h2>Comments:</h2>
                   </div>
                    <ul>
                        {blog.comments?.map(comment => (
                            <div >
                                {/* <li >{comment.postedBy}</li>
                                                            <li key={comment._id}>{comment.text}</li> */}
                                        <Comments comment={comment}/>

                            </div>
                        ))}
                    </ul>
                    
            
                        </div>
                </div>
                    </div>
            ) : (
                <p>Loading...</p>
            )}
    </> : <LoginFirst/>
}
        </div>
    );
};

export default Blog;
