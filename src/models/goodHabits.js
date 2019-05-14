import Immutable from 'seamless-immutable';
import axios from 'axios';

// Locals
import {urlManual} from '~/config';

const initStatus = Immutable({
  item: [],
  loading: false,
  error: null
});

const goodHabits = {
  state: initStatus,
  name: 'goodHabits',
  reducers: {
    item(state, payload) {
      return state.merge({
        item: payload
      });
    },
    loading(state, loading) {
      return state.merge({
        loading
      });
    },
    error(state, payload) {
      return state.merge({
        error: payload
      });
    }
  },
  effects: dispatch => ({
    async getManual() {
      try {
        const {data} = await axios.get(urlManual);
        dispatch.goodHabits.item(data);
      } catch (e) {
        dispatch.goodHabits.error(e);
      }
    }
  }),
  logics: [
    {
      type: 'goodHabits/getManual',
      latest: true,
      process(context, dispatch, done) {
        dispatch.goodHabits.loading(true);
        done();
      }
    },
    {
      type: ['goodHabits/error', 'goodHabits/item'],
      latest: true,
      process(context, dispatch, done) {
        dispatch.goodHabits.loading(false);
        done();
      }
    }
  ]
};

export default goodHabits;
