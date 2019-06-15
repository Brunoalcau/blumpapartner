// import { Location, TaskManager, Permissions } from 'expo';
import axios from 'axios';
import { head } from 'lodash';
import { AsyncStorage } from 'react-native';
import Permissions from 'react-native-permissions';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

export const configurationGeoLocation = async store => {
	const permission = await Permissions.request('location');
	store.dispatch.application.permissions(['authorized'].includes(permission));
};

const defaultProps = {
	locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
	stationaryRadius: 1,
	distanceFilter: 1,
	debug: false,
	startForeground: false,
	stopOnStillActivity: false,
	stopOnTerminate: true,
	maxLocations: 100,
	activitiesInterval: 1000,
	interval: 1000,
	fastestInterval: 10000
};

const handlerLocation = location => {};

export const backgroundconfigure = (config = defaultProps) =>
	BackgroundGeolocation.configure(config);

export const backgroundconfigureEvents = store => {
	BackgroundGeolocation.on('location', location => {
		BackgroundGeolocation.startTask(async taskKey => {
			const serviceId = await AsyncStorage.getItem('serviceId');
			await postLocation({ location, serviceId });
			await onStopServiceIdNull();
		});
	});

	BackgroundGeolocation.on('stationary', location => {
		console.log('[DEBUG] BackgroundGeolocation stationary', location);
		BackgroundGeolocation.startTask(async taskKey => {
			console.log(taskKey);
			const serviceId = await AsyncStorage.getItem('serviceId');
			await postLocation({ location, serviceId });
			await onStopServiceIdNull();
			BackgroundGeolocation.endTask(taskKey);
		});
	});

	BackgroundGeolocation.on('start', () => {
		console.log('[INFO] App is in start');
	});

	BackgroundGeolocation.on('error', ({ message }) => {
		console.log('BackgroundGeolocation error', message);
	});
	BackgroundGeolocation.checkStatus(status => {
		console.log(
			'[INFO] BackgroundGeolocation service is running',
			status.isRunning
		);
		console.log(
			'[INFO] BackgroundGeolocation services enabled',
			status.locationServicesEnabled
		);
		console.log(
			'[INFO] BackgroundGeolocation auth status: ' + status.authorization
		);

		BackgroundGeolocation.start();
	});
};

export const getCurrentLocation = async () => {
	return new Promise((resolve, reject) => {
		return BackgroundGeolocation.getCurrentLocation(
			location => resolve(location),
			() => error => reject(error)
		);
	});
};

export const backgroundStart = () => BackgroundGeolocation.start();

export const backgroundStop = () => BackgroundGeolocation.stop();

const postLocation = async ({ location, serviceId }) => {
	try {
		const url = `https://blumpa-service.herokuapp.com/geo/${serviceId}`;
		await axios.patch(url, location);
	} catch (e) {
		// console.log(e);
	}
};

const onStopServiceIdNull = async () => {
	const serviceId = await AsyncStorage.getItem('serviceId');
	console.log(serviceId);
	if (!serviceId) {
		backgroundStop();
	}
};
