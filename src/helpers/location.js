// import { Location, TaskManager, Permissions } from 'expo';
import axios from 'axios';
import { head } from 'lodash';
import { AsyncStorage } from 'react-native';
import Permissions from 'react-native-permissions';

export const BACKGROUND_LOCATION_UPDATES_TASK = 'background-location-updates';

export const configurationGeoLocation = async store => {
	const permission = await Permissions.request('location');
	store.dispatch.application.permissions(['authorized'].includes(permission));
};

// export const requestAuthorizationGeoLocation = () =>

// export const handleLocationUpdate = async ({ data, error }) => {
// 	if (error) {
// 		return;
// 	}
// 	if (data) {
// 		try {
// 			const { locations } = data;
// 			const serviceId = await AsyncStorage.getItem('serviceId');
// 			if (serviceId) {
// 				const { locations } = data;
// 				const url = `https://blumpa-service.herokuapp.com/geo/${serviceId}`;
// 				await axios.patch(url, head(locations));
// 			}
// 		} catch (error) {
// 			console.log('the error', error);
// 		}
// 	}
// };

// export const initializeBackgroundLocation = async () => {
// 	const isRegistered = await TaskManager.isTaskRegisteredAsync(
// 		BACKGROUND_LOCATION_UPDATES_TASK
// 	);
// 	if (!isRegistered)
// 		await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK, {
// 			accuracy: Location.Accuracy.High,
// 			/* after edit */
// 			timeInterval: 4000,
// 			distanceInterval: 10
// 		});
// };

// export const unregisterTaskAsync = async () => {
// 	await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK);
// };
