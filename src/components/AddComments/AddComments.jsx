import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import './AddComments.scss'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { database } from '../../firebase'
import {BsFillArrowRightSquareFill} from 'react-icons/bs'

const AddComments = ({getDataFromFirestore}) => {

  const {userInfo} = useContext(UserContext);
  const { isLoggedIn } = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const { id } = useParams();
  const addCommentsHandler = async () => {
    if(inputText.trim() === '') return;
    const postRef = doc(database, "posts", id);
    let prevComment;
    await getDoc(postRef).then(snap => {
      prevComment = snap.data().comments;
    })
    const data = {
      comments: [...prevComment, {content: inputText.trim(), date: new Date().toLocaleDateString(), userDetails: {
        name: userInfo.displayName,
        email: userInfo.email,
        photoURL: userInfo.photoURL,
      } }]
    };

    await updateDoc(postRef, data)
      .then(() => {
      console.log('Success')
    })
      .catch(err => {
        console.log(err)
      })

      setInputText('');
      getDataFromFirestore();
  }


  return isLoggedIn && 
  <div className="add-comments">
    <div className="comment">
      <img className='comments__input-img' src={userInfo.photoURL} alt={userInfo.displayName} />
      <input value={inputText} onChange={(e) => setInputText(e.target.value)} className='comments__input' type="text" placeholder='Comments here...' />
      <button onClick={addCommentsHandler} className='comments__btn'>
        <BsFillArrowRightSquareFill className='icon'/>
      </button>
    </div>
  </div>
}

export default AddComments;