import React, { useEffect, useState } from 'react'
import "../styles/Comments.css"
import { useNavigate } from 'react-router-dom';
const Comments = ({comment}) => {
    const navigate = useNavigate();

    const [retrievedReplies, setRetrievedReplies] = useState([])

    const [showTextArea, setShowTextArea] = useState(false);
    // const [reply, setReply ] = useState("")
    const [reply, setReply ] = useState({ text : ''});
    useEffect(()=>{
       console.log("this comment is coming fromt the comment.jsx component",comment) 
      //  fetchRetrievedReplies();

    },[])


    // const fetchRetrievedReplies = async()=>{
    //   try {
    //      const response = await fetch(`http://localhost:5000/api/v1/comments/`)
    //   } catch (error) {
        
    //   }
    // }
    const handleReplyChange = (e)=>{
      setReply({text : e.target.value})

    }

    const handleSubmit =async ()=>{
    
      console.log(comment._id);

     
      try {

        const response = await fetch(`http://localhost:5000/api/v1/blogs/${comment.blogId}/reply/${comment._id}`, {
          method: 'POST',
          headers : {
            "Content-type" : "application/json",
              "token" : sessionStorage.getItem("token")
            },
          body: JSON.stringify(reply),
      })

      const data = await response.json();
      console.log("this is the response that we are getting after replying", data);
      alert("Replied successfully");
       }catch (error) {
        console.log("error while creaeting the reply", error);
      }

    }
  return (
    <div>

      <div key={comment._id}  className="comment">
        <div className="user">{comment.postedBy}</div>
        <div className="text">{comment.text}</div>
        
       
        {
          showTextArea && (
            <div className="textArea">
            <input type='text' placeholder='Post your reply'  onChange={handleReplyChange} />
            <button className='reply-submit' onClick={handleSubmit}>Submit</button>
          </div>
          )
        }


        <button className='reply' onClick={()=>setShowTextArea(!showTextArea)} >Reply</button>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Comments key={reply._id} comment={reply} />
          ))}
        </div>
      )}

  </div>
  )
}

export default Comments