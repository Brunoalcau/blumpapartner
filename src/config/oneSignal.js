import OneSignal from 'react-native-onesignal';

// Locals
import { apiKeyOneSignal } from './variables';

export const configurationOneSignal = store => {
	OneSignal.setLogLevel(6, 0);
	OneSignal.init(apiKeyOneSignal, { kOSSettingsKeyAutoPrompt: true });
	OneSignal.inFocusDisplaying(2);
	OneSignal.setSubscription(true);
	OneSignal.getPermissionSubscriptionState(status => {
		store.dispatch.application.setPlayedId(status.userId);
	});
	OneSignal.addEventListener('ids', this.onIds);
	OneSignal.addEventListener('received', ({ payload, additionalData }) => {
		console.log(payload);
		// store.dispatch(savePushMessage(payload, additionalData));
	});
	OneSignal.addEventListener('opened', ({ notification }) => {
		const { payload } = notification;
		const { additionalData } = payload;
		// console.log(payload);
	});
};

export const removeOneSignalEvents = () => {
	OneSignal.removeEventListener('opened');
};

export const registerOneSignal = userId => {
	OneSignal.setExternalUserId(userId);
};
