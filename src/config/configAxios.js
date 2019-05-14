import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { navigate } from '../helpers';

const unauthorized = 401;
export const registerInterceptors = () => {
	axios.interceptors.request.use(async config => {
		const token = await AsyncStorage.getItem('userToken');
		console.log(token);
		config.headers.Authorization = token
			? `Token token=${token}, access_type=professional`
			: 'access_type=professional';
		return config;
	});
	axios.interceptors.request.use(async response => {
		return response;
	}),
		error => {
			if (error.response.status === unauthorized) {
				navigate('Login');
			} else {
				return Promise.reject(error);
			}
		};
};

// export default instance;
