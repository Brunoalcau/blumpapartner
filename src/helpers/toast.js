import { Toast } from 'native-base';

import { theme } from '../config';

export const toast = {
	show: ({ text, type, buttonText = '', duration = 3000, position = 'top' }) =>
		Toast.show({
			text: text,
			position: position,
			duration,
			style: {
				backgroundColor: theme[type] ? theme[type] : theme.primary
			}
		})
};

