import Immutable from 'seamless-immutable';
// import { Location, Permissions, ImagePicker, ImageManipulator } from 'expo';
import { ActionSheet } from 'native-base';
import axios from 'axios';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import moment from 'moment';
import randomstring from 'random-string';
import { pickBy, identity } from 'lodash';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
// Locals
import { apiUrl } from '~/config';

const instanceLocatorId = 'f5f801ba-e1cd-4eb3-8700-7f45ae680f96';
const presenceRoomId = '20468687'; // room ID (string) of the general room created through the Chatkit inspector

const tokenProvider = new TokenProvider({
	url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/${instanceLocatorId}/token`,
	queryParams: { a: 1 }
});

const initialState = Immutable({
	currentUser: null,
	name: '',
	messages: [],
	channel: null,
	buttons: ['Foto', 'Cancelar'],
	cancelIndex: 1,
	currentAttachment: null,
	currentMessageId: null,
	loadingMessage: false,
	loading: false
});

const initConfiguration = async username => {
	const chatManager = new ChatManager({
		instanceLocator: `v1:us1:${instanceLocatorId}`,
		userId: username,
		tokenProvider
	});
	return chatManager.connect();
};

const chat = {
	name: 'chat',
	state: initialState,
	reducers: {
		currentUser(state, currentUser) {
			return state.merge({
				currentUser
			});
		},
		messages(state, message) {
			if (!state.messages.find(msg => msg._id === message._id)) {
				return state.merge({
					messages: [message, ...state.messages]
				});
			}
			return state;
		},
		clearMessages(state) {
			return state.merge({
				messages: [],
				channel: null
			});
		},
		channel(state, payload) {
			return state.merge({
				channel: payload
			});
		},
		currentAttachment(state, payload) {
			console.log(payload);
			return state.merge({
				currentAttachment: payload
			});
		},
		setlastMessageId(state, payload) {
			return state.merge({
				currentMessageId: payload
			});
		},
		loadingMessage(state, payload) {
			return state.merge({
				loadingMessage: payload
			});
		},
		setLoading(state, loading) {
			return state.merge({
				loading
			});
		}
	},
	effects: dispatch => ({
		async initConfiguration({ user, channel }, state, props) {
			try {
				this.currentUser = await initConfiguration(user);
				const onReceiveMessage = message => {
					dispatch.chat.messages({
						_id: message.id,
						text: message.text,
						createdAt: message.createdAt,
						user: { _id: message.sender.id },
						image: message.attachment ? message.attachment.link : ''
					});
				};
				const room = await this.currentUser.subscribeToRoom({
					roomId: channel.toString(),
					hooks: {
						onMessage: message => onReceiveMessage(message),
						onUserStartedTyping: console.log,
						onUserStoppedTyping: console.log
					},
					messageLimit: 20
				});
				const rooms = await this.currentUser.getJoinableRooms();
				dispatch.chat.channel(channel);
			} catch (e) {
				console.log(e);
			}
		},
		async sendMessage([message], state) {
			try {
				const msg = {
					text: message.text,
					roomId: state.chat.channel.toString(),
					attachment: state.chat.currentAttachment
				};
				const currentMessageId = await this.currentUser.sendMessage(
					pickBy(msg, identity)
				);
				dispatch.chat.setlastMessageId(currentMessageId);
			} catch (e) {
				dispatch.chat.setlastMessageId(null);
			}
		},
		async loadPreviousMessages(context, state) {
			const oldestMessageId = Math.min(
				...state.chat.messages.map(m => parseInt(m.key))
			);
		},
		async openMenu(context, state) {
			const currentUser = this.currentUser;
			const options = {
				title: 'Selecione...',
				takePhotoButtonTitle: null,
				chooseFromLibraryButtonTitle: 'Fotos',
				storageOptions: {
					skipBackup: true,
					path: 'images'
				}
			};
			try {
				ImagePicker.launchImageLibrary(options, async response => {
					if (response.didCancel) {
						console.log('User cancelled image picker');
					} else if (response.error) {
						console.log('ImagePicker Error: ', response.error);
					} else {
						const source = { uri: response.uri };
						const imageCompress = await ImageResizer.createResizedImage(
							response.uri,
							300,
							400,
							'PNG',
							0
						);
						const msg = {
							file: {
								name: imageCompress.name,
								type: 'image/jpg',
								uri: imageCompress.uri
							},
							name: imageCompress.name
						};
						dispatch.chat.loadingMessage(true);
						await this.currentUser.sendMessage({
							roomId: state.chat.channel.toString(),
							text: 'imagem',
							attachment: msg
						});
						dispatch.chat.loadingMessage(false);
					}
				});
			} catch (e) {
				console.log(e);
			}
		},
		onCleanAttachment() {
			dispatch.chat.currentAttachment(null);
		}
	}),
	logics: [
		{
			type: 'chat/setlastMessageId',
			latest: true,
			process(context, dispatch, done) {
				dispatch.chat.currentAttachment(null);
				dispatch.chat.loadingMessage(false);
				done();
			}
		},
		{
			type: 'chat/sendMessage',
			latest: true,
			process(context, dispatch, done) {
				dispatch.chat.loadingMessage(true);
				done();
			}
		},
		{
			type: 'chat/initConfiguration',
			latest: true,
			process(context, dispatch, done) {
				dispatch.chat.setLoading(true);
				done();
			}
		},
		{
			type: 'chat/channel',
			latest: true,
			process(context, dispatch, done) {
				dispatch.chat.setLoading(false);
				done();
			}
		}
	]
};

export default chat;
