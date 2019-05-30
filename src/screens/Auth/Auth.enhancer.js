import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { AsyncStorage, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
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
			try {
				await this.props.getRoom();
			} catch (e) {
			} finally {
				SplashScreen.hide();
				const token = await AsyncStorage.getItem('userToken');
				const user = await AsyncStorage.getItem('user');
				registerOneSignal(user);
				if (token) {
					this.props.setUser({ token, user });
				}
				this.props.navigation.navigate(token ? 'App' : 'Auth');
			}
		}
	})
);
