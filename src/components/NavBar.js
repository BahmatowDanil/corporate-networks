import React, { useCallback } from 'react';
import { Navbar, Container, Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';

import './NavBar.css';

export const NavBar = () => {
	const auth = useAuth();
	const history = useHistory();
	const language = useLanguage();
	
	const handleLogout = useCallback(() => {
		auth.signout(() => {
			history.replace('/');
		});
	}, [auth, history]);

	return (
			<Navbar variant="dark" expand="lg" bg="dark" sticky="top">
			<Container>
				<Navbar.Brand>{language.currentDictionary.NavBar.Brand}</Navbar.Brand>
				<Navbar.Collapse className="justify-content-end">
					<Form.Select
						name="language"
						onChange={(event) => language.changeLanguage(Number(event.target.value))}
						className="cursor-pointer w-25"
						value={language.currentLanguageId}
					>
						{language.languages.map((item) =>
							<option key={item.id} value={item.id} className="cursor-pointer">{item.language}</option>
						)}
					</Form.Select>

					{auth.isAuthenticated === true && (
						<>
							<Link className="link-light mx-3" to={(l) => ({...l, pathname: '/profile'})} >{auth.currentUser?.name ?? ''}</Link>
							<Button variant="outline-light" onClick={handleLogout}>{language.currentDictionary.NavBar.Logout}</Button>
						</>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}