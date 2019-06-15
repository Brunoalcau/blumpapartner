import Immutable from 'seamless-immutable';
import axios from 'axios';
import { Platform } from 'react-native';
import { omit } from 'lodash';
import { AsyncStorage } from 'react-native';
import { authenticationApi } from '~/api';
// Locals
import { apiUrl, registerOneSignal } from '~/config';
import { storage, navigate, toast } from '~/helpers';

const initialState = Immutable({
  isSignedIn: false,
  userData: null,
  loading: false,
  error: null
});
const authentication = {
  name: 'authentication',
  state: initialState,
  reducers: {
    success: (state, userData) => {
      return state.merge({ isSignedIn: true, userData });
    },

    failed: (state, error) =>
      state.merge({ isSignedIn: false, userData: null, error }),

    loading: (state, value) => state.merge({ loading: value }),

    reset: () => {
      return initialState;
    }
  },

  effects: dispatch => ({
    async signin(user) {
      try {
        const data = await authenticationApi.signin(user);
        dispatch.authentication.success(data);
      } catch (error) {
        console.log(error.message);
        toast.show({ text: 'Numero ou senha estão inválidos', type: 'danger' });
        dispatch.authentication.failed({
          error
        });
      }
    },
    async logout() {}
  }),
  logics: [
    {
      type: 'authentication/signin',
      latest: true,
      process(context, dispatch, done) {
        dispatch.authentication.loading(true);
        done();
      }
    },
    {
      type: ['authentication/success', 'authentication/failed'],
      latest: true,
      process(context, dispatch, done) {
        dispatch.authentication.loading(false);
        done();
      }
    },
    {
      type: 'authentication/success',
      latest: true,
      async process({ action }, dispatch, done) {
        const { access_token, uuid } = action.payload;

        registerOneSignal(uuid);

        dispatch.application.setUser({ user: uuid, token: access_token });
        navigate('App');
        // TODO
        await AsyncStorage.setItem('userToken', access_token);
        await AsyncStorage.setItem('user', uuid);
        done();
      }
    }
  ]
};
export default authentication;
