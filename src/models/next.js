import Immutable from 'seamless-immutable';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import { isEmpty } from 'lodash';
// Locals
import { apiUrl } from '~/config';
import { serviceApi, chatApi } from '~/api';

const initialState = Immutable({
	item: null,
	loading: false,
	itemError: null
});

const next = {
	name: 'next',
	state: initialState,
	reducers: {
		getSuccess(state, payload) {
			return state.merge({
				item: payload
			});
		},
		getError(state, payload) {
			return state.merge({
				itemError: payload
			});
		},
		loading(state, loading) {
			return state.merge({
				loading
			});
		}
	},
	effects: dispatch => ({
		async get(context, state) {
			try {
				const data = await serviceApi.next(state.application.user);
				let room = null;
				// console.log(data);
				if (!isEmpty(data) && !data.room_id) {
					room = await chatApi.create(data.id);
				}
				console.log(room);
				if (!isEmpty(data)) {
					dispatch.next.getSuccess({
						id: data.id,
						address: data.address.full_street_address,
						scheduled: data.scheduled,
						date: moment(data.start_time).format('DD/MM/YYYY HH:mm'),
						hourState: moment(data.start_time).format('HH:mm'),
						hours: data.hours,
						note: data.note,
						ironing: data.ironing,
						dishwasher: data.dishwasher,
						sustainable: data.sustainable,
						can_check_in: data.can_check_in,
						can_check_out: data.can_check_out,
						can_cancel: data.can_cancel,
						can_set_on_the_way: data.can_set_on_the_way,
						room_id: data.room_id ? data.room_id : room.room_id
					});
				} else {
					dispatch.next.getSuccess(null);
				}
			} catch (e) {
				dispatch.next.getError(e);
			}
		}
	}),
	logics: [
		{
			type: 'next/getSuccess',
			latest: true,
			async process({ action }, dispatch, done) {
				const { payload } = action;
				if (payload && payload.can_check_in) {
					await AsyncStorage.setItem('serviceId', `${payload.id}`);
				}
				dispatch.next.loading(false);
				done();
			}
		},
		{
			type: 'next/get',
			latest: true,
			process({ action }, dispatch, done) {
				dispatch.next.loading(true);
				done();
			}
		},
		{
			type: 'next/getError',
			latest: true,
			process(context, dispatch, done) {
				dispatch.next.loading(false);
				done();
			}
		}
	]
};

export default next;
