import React from 'react';
import styled from 'styled-components';
import loading from '../../assets/loading-2.svg';

const Loading = () => {
	return (
		<LoadingWrapper>
			<div>
				<img height="200" width="200" src={loading} alt="loading..." />
			</div>
		</LoadingWrapper>
	);
};

export default Loading;

const LoadingWrapper = styled.div`
	height: 90vh;
	width: 90%;
	margin: 2rem auto;
	display: flex;
	align-items: center;
	justify-content: center;
`;
