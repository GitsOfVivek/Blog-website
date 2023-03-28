import './CreatePost.css';
import Popup from '../Popup/Popup';
import UserContext from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { doc, setDoc, getDocs } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { database, colRef } from '../../firebase';
import PostContext from '../../context/PostContext';
import styled from 'styled-components';
import { MdDone } from 'react-icons/md';

const CreatePost = () => {
	const { isLoggedIn, userInfo } = useContext(UserContext);
	const { setTotalPosts } = useContext(PostContext);
	const [isPostCreated, setIsPostCreated] = useState(false);
	const [disableBtn, setDisableBtn] = useState(false);
	const [postDetails, setPostDetails] = useState({
		title: '',
		post: '',
		date: '',
		author: {
			name: userInfo?.displayName,
			email: userInfo?.email,
			photoURL: userInfo?.photoURL,
		},
		id: '',
	});

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
				<PostCreatedAlert>
					<span>
						<MdDone className="sign" />
					</span>
					<div className="title">Success</div>
					<div className="dec">
						Your post has been added successfully!
					</div>
					<button
						onClick={() => {
							setIsPostCreated(false);
						}}>
						OK
					</button>
				</PostCreatedAlert>
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
					required
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
					id="title"></textarea>

				<input
					className={`create-post-btn ${
						disableBtn ? 'disabled' : ''
					}`}
					type="submit"
					value="Create Post"
				/>
			</form>
		</div>
	);
};

export default CreatePost;

const PostCreatedAlert = styled.div`
	width: 50%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 10px;
	position: fixed;
	background: #e1e1e1;
	color: #404040;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	gap: 2rem;
	z-index: 999;

	span {
		height: 150px;
		width: 150px;
		background: green;
		position: absolute;
		top: -75px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 100%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;

		.sign {
			font-size: 6rem;
		}
	}

	div {
		text-align: center;
		padding: 5px;
	}
	.title {
		font-size: 3rem;
		font-weight: 600;
		margin-top: 100px;
	}
	.dec {
		font-size: 1.5rem;
	}

	button {
		width: 40%;
		padding: 15px;
		font-size: 1.3rem;
		background: #00e000;
		color: #fff;
		border: 0;
		font-weight: 600;
		cursor: pointer;
		margin-bottom: 1rem;
	}
`;
