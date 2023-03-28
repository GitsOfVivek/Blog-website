import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Blogs from './components/Blogs/Blogs';
import PostDetails from './components/PostDetails/PostDetails';
import About from './components/About/About';
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import CreatePost from './components/CreatePost/CreatePost';
import Profile from './components/Profile/Profile';
import PostContext from './context/PostContext';
import { posts } from './firebase';

const App = () => {
	const [userInfo, setUserInfo] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [totalPosts, setTotalPosts] = useState([]);

	useEffect(() => {
		posts.then(post => {
			post.sort((a, b) => a.date - b.date);
			setTotalPosts(post);
		});
	}, []);
	return (
		<PostContext.Provider value={{ totalPosts, setTotalPosts }}>
			<UserContext.Provider
				value={{ userInfo, setUserInfo, isLoggedIn, setIsLoggedIn }}>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<Blogs />} />
						<Route path="/about" element={<About />} />
						<Route path="/blogs" element={<Blogs />} />
						<Route path="/create-post" element={<CreatePost />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/blogs/:id" element={<PostDetails />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</UserContext.Provider>
		</PostContext.Provider>
	);
};

export default App;
