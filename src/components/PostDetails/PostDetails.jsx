import { uuidv4 } from '@firebase/util';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { database } from '../../firebase';
import AddComments from '../AddComments/AddComments';
import Comments from '../Comments/Comments';
import Loading from '../Loading/Loading';
import './PostDetails.scss';
import UserContext from '../../context/UserContext';
import PostContext from '../../context/PostContext';

const PostDetails = () => {
	const { id } = useParams();
	const [postDetails, setPostDetails] = useState(null);
	const [bgImg, setBgImg] = useState('');
	const { isLoggedIn, userInfo } = useContext(UserContext);
	const { setTotalPosts } = useContext(PostContext);
	const docRef = doc(database, 'posts', id);

	const getDataFromFirestore = async () => {
		const docSnap = await getDoc(docRef);
		setPostDetails(docSnap.data());
		setBgImg(docSnap.data().imgURL)
	};

	const deletePost = async () => {
		await deleteDoc(docRef);
		
		const colRef = collection(database, 'posts');

		await getDocs(colRef).then(snap => {
			let posts = [];
			snap.docs.forEach(doc => {
				posts.push({ ...doc.data(), id: doc.id });
			});
			setTotalPosts(posts);
		})


		navigate('/')
	}

	const navigate = useNavigate();
	
	useEffect(() => {
		getDataFromFirestore();
	}, []);
	return !postDetails ? (
		<Loading />
	) : (
		<>
		<div className='back-bn-wrapper'>
			<button className='back-btn' onClick={() => {
				navigate(-1);
			}}>
				Back
			</button>
			{isLoggedIn && (postDetails.author.email === userInfo.email || userInfo.email === 'vivekartist9999@gmail.com') && <button onClick={deletePost} className='delete-btn'>Delete</button>}

		</div>
		<div className='post-details-wrapper'>
			<h1 style={{
				background: `url(${bgImg ? bgImg : 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8YmxvZ3x8fHx8fDE2ODAzMzE3NDM&ixlib=rb-4.0.3&q=80&w=900'})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}} className="title">{postDetails.title}</h1>
			<div className="post">{postDetails.post}</div>
			<div className="author">
				<img
					src={postDetails.author.photoURL}
					alt={postDetails.author.name}
				/>
				<div className="author-info">
					<div className="name">{postDetails.author.name}</div>
					<div>{postDetails.author.email}</div>
					<div> Posted on {postDetails.date}</div>
				</div>
			</div>
		</div>
		{postDetails?.comments?.map((comment) => 
			<Comments key={uuidv4()} comment={comment} />
		)}
		<AddComments getDataFromFirestore={getDataFromFirestore} />
		</>
	);
};

export default PostDetails;