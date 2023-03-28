import React from 'react';
import styled from 'styled-components';

const Loading = () => {
	return (
		<LoadingWrapper>
			<div>Loading...</div>
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
