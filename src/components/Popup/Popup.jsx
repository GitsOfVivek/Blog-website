import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import UserContext from '../../context/UserContext';

const Popup = ({ message }) => {
	const { setUserInfo } = useContext(UserContext);
	const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
	const [user, setUser] = useState(null);
	const [isLogging, setIsLogging] = useState(false);
	const handleLogIn = () => {
		setIsLogging(true);
		signInWithPopup(auth, provider)
			.then(data => {
				setUser(data.user);
				setUserInfo(data.user);
				setIsLogging(false);
				setIsLoggedIn(true);
			})
			.catch(e => {
				console.log(e);
				setIsLogging(false);
			});
	};
	const navigate = useNavigate();
	return (
		<div
			style={{
				height: '100vh',
				width: '100%',
			}}>
			<BackgroundText>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
				doloremque ad velit delectus! Corporis voluptates, fugiat
				doloribus aperiam ab magnam eius iusto expedita cum veritatis
				officia minus molestiae perspiciatis, ad cupiditate voluptate
				porro mollitia repellat? Accusantium sed aperiam repellendus
				molestiae quae ut tempore modi et quis recusandae. Qui
				reiciendis eaque odit quae dolore fuga, quos, enim quia
				obcaecati exercitationem illo laborum aut similique odio
				mollitia recusandae quam numquam dolorem error ducimus facere ad
				fugiat.
			</BackgroundText>
			<PopupDiv>
				<div>
					<span>{message}</span>
				</div>
				<div>
					<button
						onClick={() => {
							navigate('/');
						}}>
						Home
					</button>
					<button onClick={handleLogIn}>Login</button>
				</div>
			</PopupDiv>
		</div>
	);
};

export default Popup;

const BackgroundText = styled.div`
	position: fixed;
	width: 100%;
	font-size: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: #ffffff15;
	font-weight: 500;
`;

const PopupDiv = styled.div`
	height: 300px;
	width: 600px;
	position: sticky;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #ffffff1c;
	backdrop-filter: blur(10px);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
	gap: 2rem;
	box-shadow: 0 0 20px #000000e1;
	border-radius: 10px;

	div {
		font-size: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;

		&:nth-child(1) {
			background: linear-gradient(to right, #93be3c, #19b130);
			padding: 5px 0;
			width: 100%;

			span {
				display: inline-block;
				font-weight: 700;
			}
		}

		&:nth-child(2) {
		}
	}
	button {
		font-size: 1.3rem;
		padding: 10px 15px;
		border-radius: 5px;
		border: 0;
		cursor: pointer;

		&:nth-child(1) {
			background: #93be3c;
		}
		&:nth-child(2) {
			background: #19b130;
		}
	}
`;
