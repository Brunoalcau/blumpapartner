// import axios from 'axios';
import Immutable from 'seamless-immutable';
import { map, filter, isEmpty, isEqual } from 'lodash';
import moment from 'moment';
// import { Location, Permissions } from 'expo';
import axios, { https } from 'axios';
import { AsyncStorage } from 'react-native';

// Locals
import { serviceApi } from '~/api';
import { apiUrl } from '~/config';
import { toast, goBack } from '~/helpers';

const initialState = Immutable({
  items: [],
  loading: false,
  confirmModalServiceOpened: false,
  selectService: null,
  acceptSuccess: null,
  goingSuccess: null,
  checkoutSuccess: null,
  cancel: {
    success: null,
    error: null
  },
  permissions: {
    location: null
  }
});

const services = {
  name: 'services',
  state: initialState,
  reducers: {
    success(state, payload) {
      return state.merge({
        items: payload
      });
    },
    acceptSuccess(state, payload) {
      return state.merge({
        acceptSuccess: payload
      });
    },
    loading(state, payload) {
      return state.merge({
        loading: payload
      });
    },
    confirmModalServiceOpen(state, confirmModalServiceOpened) {
      return state.merge({
        confirmModalServiceOpened
      });
    },
    selectService(state, selectService) {
      return state.merge({
        selectService
      });
    },
    setPermission(state, payload) {
      return state.merge({
        permissions: {
          location: payload
        }
      });
    },
    setCancel(state, payload) {
      return state.merge({
        ...payload
      });
    },
    goingSuccess(state, payload) {
      // toast.show({ text: data.message, type: 'success' });
      return state.merge({
        goingSuccess: payload
      });
    },
    checkoutSuccess(state, payload) {
      return state.merge({
        checkoutSuccess: null
      });
    }
  },
  effects: dispatch => ({
    async find(fields, state) {
      try {
        console.log(state.application.user);
        const data = await serviceApi.getservicesByProfessionals(
          state.application.user
        );

        const servicesList = map(data, current => ({
          format_date: moment(current.start_time)
            .locale('pt')
            .format('DD/MM/YYYY'),
          start_time: current.start_time,
          id: current.id,
          hours: current.hours,
          dishwasher: current.dishwasher,
          ironing: current.ironing
        }));

        dispatch.services.success(
          !isEmpty(fields)
            ? filter(servicesList, ({ raw_start_time }) =>
                isEqual(raw_start_time, fields.date)
              )
            : servicesList
        );
      } catch (e) {
        console.log(e);
        toast.show({
          text: 'Ocorreu algum problema tente novamente',
          type: 'danger'
        });
      }
    },
    async accept({ item }) {
      try {
        const data = await serviceApi.accept(item.id);
        dispatch.services.acceptSuccess(data);
        toast.show({ text: data.message, type: 'success' });
      } catch (e) {
        console.log(e);
      }
    },
    selectedService({ item }) {
      dispatch.services.selectService(item);
    },
    async checkin(payload, state) {
      try {
        // const { coords } = await Location.getCurrentPositionAsync();
        // const service = {
        //   ...payload,
        //   latitude: coords.latitude,
        //   longitude: coords.longitude,
        //   timestamp: moment().unix()
        // };
        // const data = await serviceApi.checkin(service);
        // dispatch.services.acceptSuccess(data, service);
        // toast.show({ text: data.message, type: 'success' });
      } catch (e) {
        toast.show({
          text: 'Ocorreu algum problema tente novamente',
          type: 'danger'
        });
      }
    },
    async going(payload, state) {
      try {
        const data = await serviceApi.going(payload);
        dispatch.services.goingSuccess(payload, {
          work_ticket_id: payload
        });
      } catch (e) {
        console.log(e.message);
        toast.show({
          text: 'Ocorreu algum problema tente novamente',
          type: 'danger'
        });
      }
    },
    async checkout(payload) {
      try {
        const { coords } = await Location.getCurrentPositionAsync();
        const data = await serviceApi.checkout({
          ...payload,
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp: moment().unix()
        });
        dispatch.services.checkoutSuccess(data);
        toast.show({ text: data.message, type: 'success' });
      } catch (e) {
        console.log(e);
        toast.show({
          text: 'Ocorreu algum problema tente novamente',
          type: 'danger'
        });
      }
    }
  }),
  logics: [
    {
      type: 'services/find',
      latest: true,
      process(context, dispatch, done) {
        dispatch.services.loading(true);
        done();
      }
    },
    {
      type: ['services/success', 'services/failed'],
      latest: true,
      process(context, dispatch, done) {
        dispatch.services.loading(false);
        done();
      }
    },
    {
      type: ['services/acceptSuccess', 'services/setCancel'],
      latest: true,
      async process({ action }, dispatch, done) {
        await dispatch.services.find();
        await dispatch.next.get();
        await dispatch.schedule.getNext();
        await dispatch.schedule.getHistory();
        dispatch.services.confirmModalServiceOpen(false);
        done();
      }
    },
    {
      type: 'services/checkin',
      latest: true,
      async process(context, dispatch, done) {
        await AsyncStorage.setItem('serviceId', '');
        done();
      }
    },
    {
      type: 'services/setCancel',
      latest: true,
      async process({ action }, dispatch, done) {
        const { payload } = action;
        if (payload.success) {
          await dispatch.schedule.findNextServices();
          await dispatch.schedule.getHistory();
          goBack();
        }
        done();
      }
    },
    {
      type: 'services/goingSuccess',
      latest: true,
      async process({ action }, dispatch, done) {
        const { meta } = action;
        if (meta) {
          await AsyncStorage.setItem('serviceId', `${meta.work_ticket_id}`);
          // initializeBackgroundLocation();
        }
        dispatch.next.get();
        done();
      }
    },
    {
      type: 'services/checkoutSuccess',
      latest: true,
      async process(context, dispatch, done) {
        console.log('context');
        await AsyncStorage.setItem('serviceId', '');
        dispatch.next.get();
        done();
      }
    }
  ]
};

export default services;
