import Immutable from 'seamless-immutable';
import { map } from 'lodash';
import moment from 'moment';
import { AsyncStorage } from 'react-native';

// Locals
import { serviceApi } from '~/api';
import { toast, goBack } from '~/helpers';

const initialState = Immutable({
  item: null,
  cancel: null
});

const service = {
  name: 'service',
  state: initialState,
  reducers: {
    requestServiceSuccess(state, payload) {
      return state.merge({
        item: payload
      });
    },
    cancel(state, cancel) {
      return state.merge({
        cancel
      });
    }
  },
  effects: dispatch => ({
    async get(id) {
      const data = await serviceApi.getById(id);
      if (data) {
        dispatch.service.requestServiceSuccess(
          {
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
            can_set_on_the_way: data.can_set_on_the_way
          },
          { loading: { visible: false } }
        );
      }
    },
    async onCancel(service) {
      try {
        const data = await serviceApi.cancel(service);
        toast.show({ text: data.message, type: 'success' });
        dispatch.service.cancel({
          success: true,
          message: data.message
        });
      } catch (e) {
        toast.show({
          text: 'Ocorreu algum problema tente novamente',
          type: 'danger'
        });
      }
    }
  }),
  logics: [
    {
      type: 'service/cancel',
      latest: true,
      async process({ action }, dispatch, done) {
        const { payload } = action;
        if (payload.success) {
          await dispatch.schedule.getNext();
          await dispatch.schedule.getHistory();
          await dispatch.next.get();
          await AsyncStorage.setItem('serviceId', '');
          goBack();
        }
        done();
      }
    }
  ]
};

export default service;
