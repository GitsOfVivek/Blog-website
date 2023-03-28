import './Blogs.css';
import PostCard from '../PostCard/PostCard';
import { useContext } from 'react';
import { uuidv4 } from '@firebase/util';
import Loading from '../Loading/Loading';
import styled from 'styled-components';
import PostContext from '../../context/PostContext';

const Blogs = () => {
	const { totalPosts } = useContext(PostContext);
	return !totalPosts.length ? (
		<Loading />
	) : (
		<BlogsWrapper>
			{totalPosts.map(post => (
				<PostCard key={uuidv4()} {...post} />
			))}
		</BlogsWrapper>
	);
};

export default Blogs;

const BlogsWrapper = styled.div`
	width: 90%;
	margin: 2rem auto;
	gap: 1rem;
	flex-wrap: wrap;
	display: flex;
	align-items: center;
	justify-content: center;
`;
