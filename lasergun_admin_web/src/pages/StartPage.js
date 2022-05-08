import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
	FormControl,
	FormControlLabel,
	InputAdornment,
	IconButton,
	Button,
	Checkbox,
	TextField,
} from '@mui/material';
import {
	Mail as MailIcon,
	Password as PasswordIcon,
	Visibility,
	VisibilityOff,
	Login as LoginIcon,
} from '@mui/icons-material';
import AppBox from '../layouts/AppBox';
import Styles from '../Styles';
import AppContext from '../AppContext';

export default function StartPage() {
	const { t } = useTranslation();
	const appContext = React.useContext(AppContext);
	const [rememberLogin, setRememberLogin] = React.useState(localStorage.getItem('remember') ? true : false);
	const [values, setValues] = React.useState({
		email: localStorage.getItem('email') || "",
		password: localStorage.getItem('password') || "",
		showPassword: false,
	});

	/**
	 * Handle form.
	 */
	const handleChange = (prop) => (event) => {
		setValues({
			...values,
			[prop]: event.target.value,
		});
	};
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	/**
	 * Handle form submit.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (await appContext.signIn(values.email.trim(), values.password)) {
			if (rememberLogin) {
				localStorage.setItem('email', values.email.trim());
				localStorage.setItem('password', values.password);
				localStorage.setItem('remember', 1);
			}
			else {
				localStorage.removeItem('email');
				localStorage.removeItem('password');
				localStorage.removeItem('remember');
			}
			localStorage.setItem('signin', 1);
		}
	};

	return (
		<AppBox title={t('startPage.title')} showMainIcon={true}>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth sx={{ m: 1 }}>
					{/* email */}
					<TextField
						id="email"
						placeholder={t('startPage.email')}
						value={values.email}
						type="email"
						required
						variant="outlined"
						onChange={handleChange('email')}
						InputProps={{
							startAdornment: <InputAdornment position="start"><MailIcon /></InputAdornment>,
						}}
					/>
					{Styles.betweenVertical}

					{/* password */}
					<TextField
						id="password"
						placeholder={t('startPage.password')}
						value={values.password}
						type={values.showPassword ? 'text' : 'password'}
						required
						variant="outlined"
						onChange={handleChange('password')}
						inputProps={{ minLength: 4, maxLength: 20 }}
						InputProps={{
							startAdornment: <InputAdornment position="start"><PasswordIcon /></InputAdornment>,
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end">
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						{/* remember login? */}
						<FormControlLabel
							label={t('startPage.remember')}
							control={
								<Checkbox
									checked={rememberLogin}
									onChange={(event) => setRememberLogin(event.target.checked)}
								/>
							}
						/>

						{/* forgot password? */}
						<Link to="forgot" style={{ alignSelf: 'center' }}>{t('startPage.forgotPassword')}</Link>
					</div>
					{Styles.betweenVertical}

					{/* login */}
					<Button
						color="primary" variant="contained"
						startIcon={<LoginIcon />}
						type="submit"
					>
						{t('startPage.ok')}
					</Button>
				</FormControl>
			</form>
		</AppBox>
	);
}
