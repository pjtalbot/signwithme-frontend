import { render, screen } from '@testing-library/react';
import App from './App';
import Gif from './Gif';

test('renders learn react link', () => {
	render(<App />);

	expect(<Gif />).toBeInTheDocument();
});
