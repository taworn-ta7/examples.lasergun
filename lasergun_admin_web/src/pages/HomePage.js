import React from 'react';
import AppContext from '../AppContext';
import AuthenRequired from '../AuthenRequired';
import StartPage from './StartPage';
import DashboardPage from './DashboardPage';

export default function HomePage() {
	const appContext = React.useContext(AppContext);
	if (!appContext.login) {
		return (
			<StartPage />
		);
	}
	else {
		return (
			<AuthenRequired>
				<DashboardPage />
			</AuthenRequired>
		);
	}
}
