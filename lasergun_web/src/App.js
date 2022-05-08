import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeManager } from './ThemeContext';
import { DialogCallbackContext, DialogProvider } from './DialogContext';
import { AppProvider } from './AppContext';
import WaitForSessionLoaded from './WaitForSessionLoaded';
import AuthenRequired from './AuthenRequired';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/accounts/ForgotPasswordPage';
import SignUpPage from './pages/accounts/SignUpPage';
import ChangeIconPage from './pages/profile/ChangeIconPage';
import ChangeNamePage from './pages/profile/ChangeNamePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
	return (
		<CssBaseline>
			<ThemeManager>
				<DialogCallbackContext.Provider value={{ callback: null }}>
					<DialogProvider>
						<AppProvider>
							<WaitForSessionLoaded>
								<BrowserRouter>
									<Routes>
										<Route path="/" element={<HomePage />} />
										<Route path="forgot" element={<ForgotPasswordPage />} />
										<Route path="signup" element={<SignUpPage />} />
										<Route path="profile">
											<Route path="change-icon" element={<AuthenRequired><ChangeIconPage /></AuthenRequired>} />
											<Route path="change-name" element={<AuthenRequired><ChangeNamePage /></AuthenRequired>} />
											<Route path="change-password" element={<AuthenRequired><ChangePasswordPage /></AuthenRequired>} />
										</Route>
										<Route path="settings" element={<AuthenRequired><SettingsPage /></AuthenRequired>} />
									</Routes>
								</BrowserRouter>
							</WaitForSessionLoaded>
						</AppProvider>
					</DialogProvider>
				</DialogCallbackContext.Provider>
			</ThemeManager>
		</CssBaseline>
	);
}
