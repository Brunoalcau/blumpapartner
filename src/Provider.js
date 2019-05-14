import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './config';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { getPersistor } from '@rematch/persist';
// Locals
import store from './store';

export default ({ children, store }) => (
	<ReduxProvider store={store}>
		<PersistGate persistor={getPersistor()}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</PersistGate>
	</ReduxProvider>
);
