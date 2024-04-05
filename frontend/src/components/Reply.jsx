import React from 'react';

const Reply = ({ comment }) => {
  return (
    <div className="comment">
      <div>{comment.content}</div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Reply key={reply._id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default  Reply;