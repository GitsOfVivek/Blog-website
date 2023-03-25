import './Header.css';
import { Link } from 'react-router-dom';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import loading from '../../assets/loading.svg';

const Header = () => {
	const [user, setUser] = useState(null);
	const [isLogging, setIsLogging] = useState(false);
	const handleLogIn = () => {
		setIsLogging(true);
		signInWithPopup(auth, provider)
			.then(data => {
				setUser(data.user);
				console.log(data.user);
				setIsLogging(false);
			})
			.catch(e => {
				console.log(e);
				setIsLogging(false);
			});
	};

	return (
		<div className="header-wrapper">
			<header className="header">
				<Link className="logo" to="/">
					{'< Blogs />'}
				</Link>
				<div className="nav-links">
					<Link to="/about">About</Link>
					<Link to="/blogs">Blogs</Link>
					<Link to="/contact">Contact</Link>
				</div>
				{user ? (
					<button className="btn-login">{user.displayName}</button>
				) : (
					<button
						disabled={isLogging}
						onClick={handleLogIn}
						className="btn-login">
						{isLogging ? (
							<img
								style={{
									height: '20px',
									width: '20px',
									margin: '0 10px',
								}}
								src={loading}
							/>
						) : (
							'Log In'
						)}
					</button>
				)}
			</header>
		</div>
	);
};

export default Header;
