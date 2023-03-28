import './CreatePost.css';
import Popup from '../Popup/Popup';
import UserContext from '../../context/UserContext';
import { useContext, useState } from 'react';

const CreatePost = () => {
	const { isLoggedIn, userInfo } = useContext(UserContext);
	const [postDetails, setPostDetails] = useState({
		title: '',
		post: '',
		date: new Date().toLocaleDateString(),
		author: userInfo?.displayName,
	});

	if (!isLoggedIn) {
		return <Popup message="Login First" />;
	}

	const submitHandler = e => {
		e.preventDefault();
	};
	console.log(postDetails);

	return (
		<div className="create-post-wrapper">
			<form onSubmit={submitHandler} className="create-post">
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
					onChange={e =>
						setPostDetails({
							...postDetails,
							post: e.target.value,
						})
					}
					required
					type="text"
					id="title"></textarea>

				<input
					style={{
						width: 'fit-content',
						margin: '20px',
						cursor: 'pointer',
						background: '#19b130',
						border: '0',
						padding: '10px 25px',
						borderRadius: '5px',
						fontWeight: '600',
					}}
					type="submit"
					value="Create Post"
				/>
			</form>
		</div>
	);
};

export default CreatePost;
