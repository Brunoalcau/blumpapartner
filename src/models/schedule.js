import Immutable from 'seamless-immutable';
import {map} from 'lodash';
import moment from 'moment';
import axios from 'axios';
import {sheduleApi} from '~/api';
// Locals
import {apiUrl} from '~/config';

const initialState = Immutable({
  histories: [],
  services: [],
  loadingHistory: false,
  loadingDone: false,
  errorHistory: null
});

const schedule = {
  name: 'schedule',
  state: initialState,
  reducers: {
    requestHistorySuccess(state, payload) {
      return state.merge({
        histories: payload
      });
    },
    services(state, payload) {
      return state.merge({
        services: payload
      });
    },
    loadingHistory(state, loadingHistory) {
      return state.merge({
        loadingHistory
      });
    },
    loadingDone(state, loadingDone) {
      return state.merge({
        loadingDone
      });
    },
    errorHistory(state, errorHistory) {
      return state.merge({
        errorHistory
      });
    },
    errorServices(state, errorServive) {
      return state.merge({errorServive});
    }
  },
  effects: dispatch => ({
    async getHistory(context, state) {
      try {
        // V3
        // const data = await sheduleApi.getNext(state.application.user);
        const requestTheHistory = await axios.get(
          `${apiUrl}/v2/professional/history`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const {data} = requestTheHistory;
        dispatch.schedule.requestHistorySuccess(
          map(data, item => ({
            format_date: item.start_time,
            hours: item.hours,
            id: item.id
          }))
        );
      } catch (e) {
        dispatch.schedule.errorHistory(e);
      }
    },
    async getNext(context, state) {
      try {
        // const data = await sheduleApi.getDone(state.application.user);
        const requestTheService = await axios.get(
          `${apiUrl}/v2/professional/services`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const {data} = requestTheService;
        dispatch.schedule.services(
          map(data, item => ({
            format_date: item.start_time,
            hours: item.hours,
            id: item.id
          }))
        );
      } catch (e) {
        dispatch.schedule.errorServices(e);
      }
    }
  }),
  logics: [
    {
      type: 'schedule/getHistory',
      latest: true,
      process(context, dispatch, done) {
        dispatch.schedule.loadingHistory(true);
        done();
      }
    },
    {
      type: 'schedule/getNext',
      latest: true,
      process(context, dispatch, done) {
        dispatch.schedule.loadingDone(true);
        done();
      }
    },
    {
      type: 'schedule/requestHistorySuccess',
      latest: true,
      process(context, dispatch, done) {
        dispatch.schedule.loadingHistory(false);
        done();
      }
    },
    {
      type: 'schedule/services',
      latest: true,
      process(context, dispatch, done) {
        dispatch.schedule.loadingDone(false);
        done();
      }
    }
  ]
};

export default schedule;
