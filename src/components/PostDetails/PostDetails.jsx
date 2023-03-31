import { uuidv4 } from '@firebase/util';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { database } from '../../firebase';
import AddComments from '../AddComments/AddComments';
import Comments from '../Comments/Comments';
import Loading from '../Loading/Loading';
import './PostDetails.css';

const PostDetails = () => {
	const { id } = useParams();
	const [postDetails, setPostDetails] = useState(null);
	const docRef = doc(database, 'posts', id);
	const getDataFromFirestore = async () => {
		const docSnap = await getDoc(docRef);
		setPostDetails(docSnap.data());
	};
	
	useEffect(() => {
		getDataFromFirestore();
	}, []);
	return !postDetails ? (
		<Loading />
	) : (
		<>
		<PostDetailsWrapper>
			<h1 className="title">{postDetails.title}</h1>
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
		</PostDetailsWrapper>
		{postDetails?.comments?.map((comment) => 
			<Comments key={uuidv4()} comment={comment} />
		)}
		<AddComments getDataFromFirestore={getDataFromFirestore} />
		</>
	);
};

export default PostDetails;

const PostDetailsWrapper = styled.div`
	width: 60%;
	margin: 2rem auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	border: 1px solid #93be3c;
	border-radius: 5px;
	background: #1a1f2270;

	.title {
		width: 100%;
		text-align: center;
		font-size: 1.7rem;
		padding: 15px 20px;
		background: linear-gradient(to right, #93be3c, #19b130);
		border-radius: 4px 4px 0 0;
	}
	.post {
		font-size: 1.4rem;
		padding: 0 50px;
		text-align: center;
	}
	.author {
		align-self: flex-end;
		padding: 0 50px 20px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		img {
			height: 75px;
			width: 75px;
			border-radius: 100%;
			border: 2px solid #19b130;
		}

		.author-info {
			.name {
				font-size: 1.3rem;
				font-weight: 600;
			}
		}
	}
`;
