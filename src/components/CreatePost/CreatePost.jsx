import './CreatePost.scss';
import Popup from '../Popup/Popup';
import UserContext from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { doc, setDoc, getDocs } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { database, colRef } from '../../firebase';
import PostContext from '../../context/PostContext';
import { MdDone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import loading from "../../assets/loading.svg";

const CreatePost = () => {
	const { isLoggedIn, userInfo } = useContext(UserContext);
	const { setTotalPosts } = useContext(PostContext);
	const [isPostCreated, setIsPostCreated] = useState(false);
	const [disableBtn, setDisableBtn] = useState(false);
	
	const [postDetails, setPostDetails] = useState({
		title: '',
		post: '',
		date: '',
		imgURL: '',
		author: {
			name: userInfo?.displayName,
			email: userInfo?.email,
			photoURL: userInfo?.photoURL,
		},
		id: '',
		comments: [],
	});
	
	const navigate = useNavigate();

	useEffect(() => {
		if (isPostCreated) {
			setDisableBtn(true);
		} else {
			setDisableBtn(false);
		}
	}, [isPostCreated]);
	
	if (!isLoggedIn) {
		return <Popup message="Login First" />;
	}
	
	const setDataToFirestore = async () => {
		await setDoc(doc(database, 'posts', uuidv4()), postDetails);
	};
	
	const submitHandler = e => {
		e.preventDefault();
		setDisableBtn(true);
		setDataToFirestore()
			.then(() => {
				setIsPostCreated(true);
				setPostDetails({
					title: '',
					post: '',
					date: '',
					author: {
						name: userInfo?.displayName,
						email: userInfo?.email,
						photoURL: userInfo?.photoURL,
					},
				});
				getDocs(colRef)
				.then(snapshot => {
					let posts = [];
					snapshot.docs.forEach(doc => {
						posts.push({ ...doc.data(), id: doc.id });
					});
					setTotalPosts(posts);
					})
					.catch(e => {
						console.log(e);
					});
			})
			.catch(err => {
				console.log(err);
			});
	};
	
	return (
		<div className="create-post-wrapper">
			{isPostCreated && (
				<div className='create-post-card'>
					<span>
						<MdDone className="sign" />
					</span>
					<div className="title">Success</div>
					<div className="dec">
						Your post has been added successfully!
					</div>
					<button
					className='popup-btn'
						onClick={() => {
							setIsPostCreated(false);
							navigate('/');
						}}>
						OK
					</button>
				</div >
			)}
			<form
				onSubmit={submitHandler}
				className={`create-post ${isPostCreated ? 'blur' : ''}`}>
				<label htmlFor="title">Title :</label>
				<input
					value={postDetails.title}
					onChange={e =>
						setPostDetails({
							...postDetails,
							title: e.target.value,
						})
					}
					type="text"
					id="title"
					placeholder='Title of blog post...'
					required
					/>
				<label htmlFor="imgURL">Image URL :</label>
				<input
					value={postDetails.imgURL}
					onChange={e =>
						setPostDetails({
							...postDetails,
							imgURL: e.target.value
						})
					}
					type="url"
					id="imgURL"
					placeholder='Image url of blog post...(optional)'
					/>

				<label htmlFor="title">Post :</label>
				<textarea
					value={postDetails.post}
					onChange={e => {
						setPostDetails({
							...postDetails,
							post: e.target.value,
							date: new Date().toLocaleDateString(),
						});
					}}
					required
					type="text"
					placeholder='Write your post here...'
					id="title"></textarea>

				<button
					className={`create-post-btn`}
					type="submit">
						{disableBtn ?
						<img  style={{
							height: "20px",
							width: "20px",
							margin: "0 10px",
						}}
				  		src={loading}
						/> : 'Create Post'}
					</button>
			</form>
		</div>
	);
};

export default CreatePost;
