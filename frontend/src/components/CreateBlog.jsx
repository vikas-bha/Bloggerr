import React, { useEffect, useState } from 'react'
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import "../styles/CreateBlog.css"
import LoginFirst from './LoginFirst';


const navbarStyles = {
    display : "flex", 
    justifyContent: "space-between"
}

const navbarLeft ={
    cursor : "pointer"
}

const publishBlog ={
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'antiquewhite',
}

const form ={
    backgroundColor: 'gray',
    width: '600px',
    padding: '20px',
    border: '1px solid #ccc',
}

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const { user, setUser } = useUser();
    const [imgUrl, setImgUrl] = useState('');


    const navigate = useNavigate();
    useEffect(() => {
        console.log("this user is coming from the CreateBlog",user);
    }, [])


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setImgUrl(reader.result);
                setCoverImage(reader.result)
                // setSignupData(prevData => ({
                //     ...prevData,
                //     profileImageURL: reader.result
                // }));
            };

            console.log(imgUrl);
            console.log(coverImage);
    
            reader.readAsDataURL(file);
        } else {
            alert("Please select a proper image file");
            setImgUrl(null);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('coverImageURL', imgUrl || coverImage );
        formData.append('createdBy', createdBy);

        console.log(formData);
        let id= null;

        try {
            const response = await fetch('http://localhost:5000/api/v1/blogs/add', {
                method: 'POST',
                headers : {
                    "token" : sessionStorage.getItem("token")
                  },
                body: formData,
            });
            if (response.ok) {
                console.log('Blog published successfully');
                const data = await response.json();
                console.log(data);
                const blog = data.blog;
                console.log(blog);
                 id = blog._id;
                console.log(id);

            } else {
                console.error('Failed to publish blog');
            }
            navigate(`/blogs/${id}`)
            alert("Blog published successfully");
        } catch (error) {
            console.error('Error publishing blog:', error);
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
        <div className='publish'>
            <nav style={navbarStyles} className="navbar">

                <span onClick={()=>navigate("/bulk")} style={navbarLeft} className='navbar-left'>Blogger</span>


                <div className="navbar-right">
                    <button onClick={handleLogout}>Logout</button>

                </div>
            </nav>
            <div style={publishBlog} className='publish_blog'>
            
         {
            user ? (  
            <div  style={form} className="form">
             <h1 >Publish a New Blog</h1>
             <form onSubmit={handleSubmit}>
                 <label>Title:</label>
                 <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
                 <label>Body:</label>
                 <textarea  style={{minHeight:"40px",height:"100px", width:"100%"}} value={body} onChange={(e) => setBody(e.target.value)} required ></textarea>
                 <label>Cover Image:</label>
                 <input type='file' onChange={handleImageChange} accept="image/*"  />
 
                 <button type='submit'>Publish</button>
             </form>
             </div>
            ) : (<LoginFirst/>)
         }
         </div>
        </div>
    );
}

export default CreateBlog