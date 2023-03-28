import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import styled from 'styled-components';
import Popup from '../Popup/Popup';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Profile = () => {
	const { userInfo, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

	if (!isLoggedIn) {
		return <Popup message="Login First" />;
	}
	const signOutHandler = () => {
		signOut(auth)
			.then(() => {
				console.log('Sign-out successful.');
				setIsLoggedIn(false);
			})
			.catch(error => {
				console.log(error.message);
			});
	};

	return (
		<ProfileWrapper>
			<ImgWrapper>
				<ProfileImg
					src={userInfo?.photoURL}
					alt={userInfo?.displayName}
				/>{' '}
				<h1> {userInfo?.displayName}</h1>
			</ImgWrapper>
			<div className="email">Email: {userInfo?.email}</div>
			<div className="since">
				Member since: {userInfo?.metadata?.creationTime}
			</div>
			<div className="last">
				Last login at: {userInfo?.metadata?.lastSignInTime}
			</div>
			<BtnSignOut onClick={signOutHandler}>Sign Out</BtnSignOut>
		</ProfileWrapper>
	);
};

export default Profile;

const ProfileImg = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 100%;
`;
const ImgWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	background: linear-gradient(to right, #93be3c, #19b130);
	padding: 10px 0;
	width: 100%;
`;
const ProfileWrapper = styled.div`
	width: 90%;
	margin: 2rem auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 10px;
	padding-bottom: 2rem;
	border: 1px solid #93be3c;

	.email,
	.since,
	.last {
		font-size: 1.3rem;
	}
`;
const BtnSignOut = styled.button`
	color: #fff;
	padding: 10px 25px;
	font-size: 1.1rem;
	cursor: pointer;
	border: 2px solid #4f3737;
	background: transparent;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #4f3737;

	&:hover {
		background: #6f2525;
	}
`;
