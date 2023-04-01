import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="footer-wrapper">
			<div className="footer">
				<h3>
					<Link to='/'>
					<span>Blog Your Idea</span>
					</Link>
					<span style={{
						fontSize: '0.8rem',
						color: '#510a32',
						fontWeight: '400',
					}}>Created by <a href="https://github.com/GitsOfVivek/Blog-website" target='_blank'>Team AJAX</a></span>
					</h3>
			</div>
		</div>
	);
};

export default Footer;
