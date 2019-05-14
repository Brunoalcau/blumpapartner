import Immutable from 'seamless-immutable';
import axios from 'axios';
//  Locals

import { profileApi } from '~/api';
import { apiUrl } from '~/config';

const initialState = Immutable({
  item: null,
  error: null,
  loading: false
});

const validationUrl = url => {
  const regexUrl = /\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/;
  console.log(regexUrl.test(url));
  return regexUrl.test(url);
};

const profile = {
  name: 'profile',
  state: initialState,
  reducers: {
    getSuccess(state, payload) {
      return state.merge({
        item: payload
      });
    },
    getError(state, payload) {
      return state.merge({
        error: payload
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
        const data = await profileApi.getById(state.application.user);
        const profileWithAvatar = Object.assign(data, {
          avatar: validationUrl(data.avatar) ? data.avatar : ''
        });
        dispatch.profile.getSuccess(profileWithAvatar);
      } catch (e) {
        dispatch.profile.getError(e);
      }
    }
  }),
  logics: [
    {
      type: 'proifle/get',
      latest: true,
      process(contex, dispatch, done) {
        dispatch.profile.loading(true);
        done();
      }
    },
    {
      type: ['profile/getSuccess', 'profile/getError'],
      latest: true,
      process(context, dispatch, done) {
        dispatch.profile.loading(false);
        done();
      }
    }
  ]
};

export default profile;
