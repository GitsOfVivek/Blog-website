import styled from 'styled-components';
import './About.css';

const About = () => {
	return (
		<AboutWrapper>
			<h1>About Us</h1>
			<div className="about">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Perspiciatis est optio voluptas sint minus pariatur. Commodi
				esse officiis quae, id expedita necessitatibus culpa. Nam
				laborum saepe quis quos perspiciatis quaerat, nesciunt hic
				suscipit sapiente odit voluptas harum fugiat ea rem vero culpa
				fugit iure commodi aliquam cum, tempore deleniti. Accusamus
				dolorum quis officiis iste qui deleniti error praesentium minus
				nemo quam quod ea ad amet, non quasi sapiente ipsum eveniet
				quisquam tempore ab, beatae tempora, deserunt quos minima!
				Voluptate, adipisci velit enim, dignissimos alias dolorem
				numquam modi quae quas, doloremque fuga? Harum laboriosam culpa
				facilis, vel magnam eius expedita debitis magni minus rerum
				autem qui provident omnis voluptatibus eos dolorem veritatis
				nisi voluptas? Sunt quae, voluptatum iste nulla asperiores unde
				magnam. Molestiae culpa deleniti ab voluptate perferendis.
				Delectus ipsa quae soluta ducimus corporis alias provident et
				nisi laudantium. Officia officiis consectetur minima, minus
				laudantium sed veritatis modi voluptatem nobis repudiandae unde
				debitis pariatur dolorum repellendus aspernatur, quod totam
				mollitia error sint qui explicabo labore. Consequuntur sit
				corrupti quo non consequatur? Quas commodi magni incidunt omnis
				ipsum, et, voluptatum quisquam labore iure nihil, facilis
				nesciunt ab rem animi! Iusto consequuntur repellat fugit
				necessitatibus labore, at ad illo voluptates possimus voluptate
				soluta?
			</div>
		</AboutWrapper>
	);
};

export default About;

const AboutWrapper = styled.div`
	width: 80%;
	margin: 2rem auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 1rem;

	h1 {
		padding: 10px;
		width: 100%;
		background: linear-gradient(to right, #93be3c, #19b130);
		text-align: center;
	}

	.about {
		font-size: 1.4rem;
	}
`;
