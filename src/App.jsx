import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Blogs/Blogs';
import PostDetails from './components/PostDetails/PostDetails';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/blogs" element={<Home />} />
				<Route path="/blogs/:id" element={<PostDetails />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
