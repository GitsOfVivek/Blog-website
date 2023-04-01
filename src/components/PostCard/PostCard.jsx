import { Link } from 'react-router-dom';
import './PostCard.scss';

const PostCard = props => {
	return (
		<Link to={`/blogs/${props.id}`}>
			<div className='post-card-wrapper'>
				<div className="top">
					<img src={props.imgURL ? props.imgURL : 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8YmxvZ3x8fHx8fDE2ODAzMzE3NDM&ixlib=rb-4.0.3&q=80&w=900'}/>
				</div>
				<div className="bottom">
					<h1 className="title">{props.title}</h1>
					<div className="post">{props.post.slice(0, 100)}... Read more</div>
					<div className="author-info">
						<img className="author-img" src={props.author?.photoURL} />
						<div className="author-name-date">
							<div className="author-name">{props.author?.name}</div>
							<div className="author-date">{props.date}</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default PostCard;
