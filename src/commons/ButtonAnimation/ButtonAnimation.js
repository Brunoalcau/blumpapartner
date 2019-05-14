import React from 'react';
import {
	ActivityIndicator,
	Animated,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';
import styled from 'styled-components';

// import Animated from 'react-native-reanimated';
import withRematch from 'with-rematch';
import Immutable from 'seamless-immutable';

// Local
import { Button } from '../Button';

// const initialState = Immutable();
const initialState = {
	styledView: {
		height: 30,
		backgroundColor: '#25CED1',
		borderRadius: 20,
		width: 350
	},
	isLoading: false,
	width: new Animated.Value(350),
	animationDelay: 200,
	whenAnimationViewWidth: 40,
	enableWidthAnimation: true
};

const loadingContent = () => {
	return <ActivityIndicator color="#fff	" />;
};
const model = {
	state: initialState,
	reducers: {
		get() {}
	},
	effects: actions => ({
		defaultLoadingAnimation({ start, end }, state) {
			console.log(start, end);
			state.width.setValue(start);
			Animated.timing(state.width, {
				toValue: end,
				durations: state.animationDelay
			}).start();
		},
		defaultLoadingButton(context, state, props) {
			console.log(props, 'props');
			return (
				<Animated.View
					style={[
						state.viewStyle,
						{
							width: state.enableWidthAnimation
								? state.width
								: state.viewStyle.width
						}
					]}
				>
					<Button
						success
						onPress={() => {
							!props.isLoading && props.onPress();
						}}
						style={[
							{
								width: state.enableWidthAnimation
									? state.width
									: state.viewStyle.width
							}
						]}
					>
						{props.isLoading ? (
							loadingContent()
						) : (
							<Text style={styles.defaultLoadingText}>Teste</Text>
						)}
					</Button>
				</Animated.View>
			);
		},
		loadingContent() {
			return <ActivityIndicator color="#fff" />;
		}
	}),
	lifecycle: {
		componentWillReceiveProps(nextProps) {
			console.log(this.props, 'this.props');
			if (nextProps.isLoading) {
				this.props.actions.defaultLoadingAnimation(
					this.props.state.styledView.width,
					this.props.state.whenAnimationViewWidth
				);
			} else {
				this.props.actions.defaultLoadingAnimation(
					this.props.state.whenAnimationViewWidth,
					this.props.state.styledView.width
				);
			}
		}
	}
};

const styles = StyleSheet.create({
	root: {
		width: 100,
		height: 30
	},
	defaultLoadingTouch: {
		flex: 1
	},
	defaultLoadingText: {
		color: '#FFF'
	}
});

// const children = ({ children }) => ;

export const ButtonAnimation = withRematch(model)(
	({ isLoading, children, ...props }) => {
		return <Wrapper>{props.actions.defaultLoadingButton()}</Wrapper>;
	}
);

const Wrapper = styled.View``;
