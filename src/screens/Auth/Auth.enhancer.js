import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { AsyncStorage, Image } from 'react-native';

// Locals
import { images, registerOneSignal } from '~/config';

const mapStateToProps = ({ application }) => ({
	user: application.user
});

const mapDispatchToProps = ({ application }) => ({
	setUser: application.setUser,
	getRoom: application.getRoom
});

export const enhancer = compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	lifecycle({
		async componentDidMount() {
			// const loadImages = async images => {
			// 	return Promise.all(
			// 		Object.keys(images).map(i => {
			// 			const img = {
			// 				...Image.resolveAssetSource(images[i]),
			// 				cache: 'force-cache'
			// 			};
			// 			return Image.prefetch(img);
			// 		})
			// 	);
			// };
			// await loadImages(images);
			// .forEach(e => );
			await this.props.getRoom();
			const token = await AsyncStorage.getItem('userToken');
			const user = await AsyncStorage.getItem('user');
			registerOneSignal(user);
			if (token) {
				this.props.setUser({ token, user });
			}
			this.props.navigation.navigate(token ? 'App' : 'Auth');
		}
	})
);
