import Immutable from 'seamless-immutable';
import axios from 'axios';
import { apiUrl } from '~/config';
// Locals
import { toast, navigate } from '~/helpers';
import { forgetPasswordApi } from '~/api';

const initialState = Immutable({
  login: '',
  error: null,
  reset: null
});

const forgetPassword = {
  name: 'forgetPassword',
  state: initialState,
  reducers: {
    success(state, payload) {
      return state.merge({
        login: payload
      });
    },
    error(state, payload) {
      return state.merge({
        error: payload
      });
    },
    resetSuccess(state, payload) {
      return state.merge({
        reset: payload
      });
    }
  },
  effects: dispatch => ({
    async resetCode({ login }) {
      try {
        await forgetPasswordApi.resetCode(login);
        dispatch.forgetPassword.success(login);
      } catch (e) {
        dispatch.forgetPassword.error(e);
      }
    },
    async resetPassword(user) {
      try {
        const data = await forgetPasswordApi.resetPassword(user);
        dispatch.forgetPassword.resetSuccess(data);
      } catch (e) {
        // toast.show({text: data.message, type: 'danger'});
        dispatch.forgetPassword.error(e);
      }
    }
  }),
  logics: [
    {
      type: 'forgetPassword/resetSuccess',
      latest: true,
      process({ action }, dispatch, done) {
        navigate('ResetPasswordSuccess');
        done();
      }
    },
    {
      type: 'forgetPassword/success',
      latest: true,
      process({ action }, dispatch, done) {
        navigate('ResetPassword');
        done();
      }
    }
  ]
};

export default forgetPassword;
