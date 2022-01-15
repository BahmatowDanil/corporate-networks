import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { ChartsPage } from './components/Charts/ChartsPage';
import { NavBar } from './components/NavBar';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { ProvideAuth } from './components/ProvideAuth';
import { PrivateRoute } from './components/PrivateRoute';
import { ProfilePage } from './components/Profile/ProfilePage';
import { ProvideLanguage } from './components/ProvideLanguage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<ProvideLanguage>
			<ProvideAuth>
				<Router>
					<NavBar />
						<Switch>
							<Route path="/login" exact>
								<Login />
							</Route>
							<Route path="/register" exact>
								<Register />
							</Route>
							<Container>
								<PrivateRoute path="/" exact>
									<ChartsPage />
								</PrivateRoute>
								<PrivateRoute path="/profile">
									<ProfilePage />
								</PrivateRoute>
							</Container>
						</Switch>
				</Router>
    	</ProvideAuth>
		</ProvideLanguage>
	);
}

export default App;
