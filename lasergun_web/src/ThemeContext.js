import React from 'react';
import {
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import {
	blue,
	lightBlue,
	cyan,
	teal,
	green,
	lightGreen,
	lime,
	yellow,
	amber,
	orange,
	deepOrange,
	red,
	purple,
	indigo,
	brown,
	grey,
} from '@mui/material/colors';

export const ThemeContext = React.createContext(null);

// ----------------------------------------------------------------------

const colorList = [
	blue,
	lightBlue,
	cyan,
	teal,
	green,
	lightGreen,
	lime,
	yellow,
	amber,
	orange,
	deepOrange,
	red,
	purple,
	indigo,
	brown,
	grey,
];

// ----------------------------------------------------------------------

export function ThemeManager({ children }) {
	const [themes,] = React.useState(colorList.map((color) =>
		createTheme({
			palette: {
				primary: { main: color[500], },
			},
		}),
	));
	const [theme, setTheme] = React.useState(themes[0]);
	const [index, setIndex] = React.useState(0);

	/**
	 * Change theme.
	 */
	const changeTheme = (newIndex) => {
		setIndex(newIndex);
		setTheme(themes[newIndex]);
	};

	const value = {
		themes,
		index,
		changeTheme,
	};

	return (
		<ThemeProvider theme={theme}>
			<ThemeContext.Provider value={value}>
				{children}
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}

export default ThemeContext;
