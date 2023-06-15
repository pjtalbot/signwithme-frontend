import React from 'react';
import './App.css';
import './Gif.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './Home';
import Profile from './Profile';

import Search from './Search';

function App() {
	return (
		<main className="App">
			<BrowserRouter>
				<NavBar />
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/profile">
					<Profile />
				</Route>
				<Route exact path="/search">
					<Search />
				</Route>
			</BrowserRouter>
		</main>
	);
}

export default App;
