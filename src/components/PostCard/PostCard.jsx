import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './PostCard.css';

const PostCard = props => {
	return (
		<Link to={`/blogs/${props.id}`}>
			<PostCardWrapper>
				<h1 className="title">{props.title}</h1>
				<div className="post">{props.post}</div>
				<div className="author-info">
					<img className="author-img" src={props.author?.photoURL} />
					<div className="author-name-date">
						<div className="author-name">{props.author?.name}</div>
						<div className="author-date">{props.date}</div>
					</div>
				</div>
			</PostCardWrapper>
		</Link>
	);
};

export default PostCard;

const PostCardWrapper = styled.div`
	width: 350px;
	height: 300px;
	background: #4d4d4d;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	color: #fff;

	.title {
		text-align: center;
		background: #126d72;
		padding: 5px 20px;
		width: 100%;
		border-radius: 5px 5px 0 0;
		font-size: 1.3rem;
	}

	.post {
		height: 100%;
		overflow: hidden;
		padding: 10px 20px;
		align-items: center;
	}
	.author-info {
		display: grid;
		grid-template-columns: 1fr 5fr;
		background: #053f2f;
		padding: 5px 20px;
		width: 100%;
		border-radius: 0 50px 5px 5px;
		gap: 20px;
		.author-img {
			height: 50px;
			width: 50px;
			border-radius: 100%;
		}
		.author-name-date {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
		}
		.author-name {
			font-size: 1.3rem;
			font-weight: 600;
		}
	}
`;
