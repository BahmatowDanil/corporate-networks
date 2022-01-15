import { useState } from "react";
import { useLanguage } from './useLanguage';

export const useProvideAuth = () => {
	const language = useLanguage();

	const [currentUser, setCurrentUser] = useState(undefined);
	const [users, setUsers] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const register = (data, cb) => {
		const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
		const newUser = {
			id: id,
			userName: data.userName.toString(),
			password: data.password.toString(),
			name: data.name.toString(),
			age: data.age.toString(),
			country: data.country.toString()
		};
		setUsers([...users, newUser]);
		setCurrentUser(newUser);
		setIsAuthenticated(true);
		cb();
	};

	const signin = (data, messageError, cb) => {
		const user = users.find(item => item.userName === data.userName && item.password === data.password);
		if(user === undefined)
			throw new Error(messageError);

		setCurrentUser(user);
		setIsAuthenticated(true);
		cb();
	};

	const signout = (cb) => {
		setCurrentUser(undefined);
		setIsAuthenticated(false);
		cb();
	};

	const changeLoginInfo = (id, data, messageError, cb) => {
		if(!users.some(item => item.id === id))
			throw new Error(messageError);

		let usersTmp = users;
		usersTmp.forEach(item => {
			if(item.id === id) {
				item.userName = data.userName.toString();
				item.password = data.password.toString();
			}
		});
		setUsers(usersTmp);

		cb();
	};

	return {
		currentUser,
		isAuthenticated,
		register,
		signin,
		signout,
		changeLoginInfo
	};
}