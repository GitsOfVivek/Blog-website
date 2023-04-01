import './About.scss';

const About = () => {
	return (
		<div className='about-wrapper'>
			<h1>About "BlogYourIdea"</h1>
			<ul className="about">
				<li>
					This website is a blog website. Anyone can visit this website and read any blog. Id someone want to post there own blog then they must have to Log In. Once user will Log In they will see a Create Post button on header sectiopn on website. When user will click Create Post button they will see some input boxes. after filling Title, Image URL & Post user can click on Create Post button down.
				</li>
				<li>
					When post has been created user will see success modal. After that on clicking OK button user will redirect to home page. On homepage user can see latest post. If user want to delete there post then they can easily open that post and click on Delete button on top right corner.
				</li>

				<li>
					These all changes will reflect without reloading and instantly to all users.
				</li>

				<li>
					Tech Stack
					<ul>
						<li>
							React JS
						</li>
						<li>
							CSS / SASS / Styled Component
						</li>
						<li>
							Firebase / Firestore
						</li>
						<li>
							React Router Dom
						</li>
						<li>
							Context API
						</li>
					</ul>

				</li>


			</ul>
			<div className='team-name'>
					Created for Newton School Hackathon by <span>
					Team AJAX
					</span>
			</div>
		</div>
	);
};

export default About;
