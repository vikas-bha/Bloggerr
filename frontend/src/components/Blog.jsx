import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlog(id);
    }, [id]);

    const fetchBlog = async (id) => {
        // Fetch blog data based on the ID
        try {
            // const response = await fetch(`http://localhost:3000/api/v1/blogs/${id}`);
            // const data = await response.json();

            const response = await axios.get(`http://localhost:5000/api/v1/blogs/bulk/${id}`);
            console.log(response.data);

            setBlog(response.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    return (
        <div className='blog-post'>
            {blog ? (
                <div>
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
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Blog;
