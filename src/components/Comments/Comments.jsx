import { useState } from 'react';
import './Comments.css'

const Comments = ({comment}) => {
  return <div className="comments-wrapper">
    <div className="comments">
      <div className="comments__top">
        <div className="comments__left">
          <img className='comments__img' src={comment?.userDetails?.photoURL} />
        </div>
        <div className="comments__right">
          <div className="comments__username">
            {comment?.userDetails?.name}
          </div>
          <div className="comments__date">
            {comment?.date}
          </div>
        </div>

      </div>
      <div className="commnts__bottom">
        {comment?.content}
      </div>
    </div>
  </div>
};

export default Comments;