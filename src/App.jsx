import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Blogs/Blogs';
import PostDetails from './components/PostDetails/PostDetails';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import { useState } from 'react';
import UserContext from './context/UserContext';
import CreatePost from './components/CreatePost/CreatePost';
import Profile from './components/Profile/Profile';

const App = () => {
	const [userInfo, setUserInfo] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<UserContext.Provider
			value={{ userInfo, setUserInfo, isLoggedIn, setIsLoggedIn }}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/blogs" element={<Home />} />
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/blogs/:id" element={<PostDetails />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</UserContext.Provider>
	);
};

export default App;
