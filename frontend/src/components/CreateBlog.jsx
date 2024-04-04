import React, { useEffect, useState } from 'react'
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import "../styles/CreateBlog.css"
const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [createdBy, setCreatedBy] = useState('');
    const { user, setUser } = useUser();

    const navigate = useNavigate();
    useEffect(() => {
        console.log(user);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('coverImage', coverImage);
        formData.append('createdBy', createdBy);

        console.log(formData);

        try {
            const response = await fetch('http://localhost:5000/api/v1/blogs/add', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Blog published successfully');
            } else {
                console.error('Failed to publish blog');
            }
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
            <nav className="navbar">

                <span onClick={()=>navigate("/bulk")} className='navbar-left'>Blogger</span>


                <div className="navbar-right">
                    <button onClick={handleLogout}>Logout</button>

                </div>
            </nav>
            
           <div className='publish_blog'>
           <div className="form">
            <h1>Publish a New Blog</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label>Body:</label>
                <input value={body} onChange={(e) => setBody(e.target.value)} required />
                <label>Cover Image:</label>
                <input type='file' onChange={(e) => setCoverImage(e.target.files[0])} accept="image/*" required />

                <button type='submit'>Publish</button>
            </form>
            </div>
           </div>
        </div>
    );
}

export default CreateBlog