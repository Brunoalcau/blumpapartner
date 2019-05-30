import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = ({ chat, application }) => ({
	messages: chat.messages,
	user: application.user,
	currentAttachment: chat.currentAttachment,
	loadingMessage: chat.loadingMessage,
	loading: chat.loading,
	playedId: application.playedId
});

const mapDispatchToProps = ({ chat }) => ({
	initConfiguration: chat.initConfiguration,
	sendMessage: chat.sendMessage,
	clearMessages: chat.clearMessages,
	loadPreviousMessages: chat.loadPreviousMessages,
	openMenu: chat.openMenu,
	onCleanAttachment: chat.onCleanAttachment
});

export const enhancer = compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	lifecycle({
		async componentDidMount() {
			this.props.clearMessages();
			await this.props.initConfiguration({
				user: this.props.user,
				channel: this.props.navigation.getParam('channel')
			});
		}
	})
);
