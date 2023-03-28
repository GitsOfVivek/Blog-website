import './Header.css';
import { Link } from 'react-router-dom';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useState, useContext } from 'react';
import loading from '../../assets/loading.svg';
import UserContext from '../../context/UserContext';

const Header = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);
	const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
	const [isLogging, setIsLogging] = useState(false);
	const handleLogIn = () => {
		setIsLogging(true);
		signInWithPopup(auth, provider)
			.then(data => {
				setUserInfo(data.user);
				setIsLogging(false);
				setIsLoggedIn(true);
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
				<div className="btns">
					{isLoggedIn && (
						<Link to={'/create-post'} className="btn-login">
							Create Post
						</Link>
					)}

					{isLoggedIn ? (
						<Link to={'/profile'} className="btn-login">
							{userInfo?.displayName}
						</Link>
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
				</div>
			</header>
		</div>
	);
};

export default Header;
