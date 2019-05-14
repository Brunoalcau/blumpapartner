import Immutable from 'seamless-immutable';
// import { Location, Permissions } from 'expo';

// Locals
import { applicationApi } from '~/api';
import { requestAuthorizationGeoLocation } from '~/helpers';

const initialState = Immutable({
  items: [],
  loading: {
    visible: false
  },
  user: null,
  token: null,
  permissions: {
    location: null
  },
  channel: '',
  playedId: ''
});

const application = {
  name: 'application',
  state: initialState,
  reducers: {
    setLoading(state, payoad) {
      return state.merge({
        loading: {
          visible: payoad
        }
      });
    },
    permissions(state, payload) {
      console.log(payload);
      return state.merge({
        permissions: {
          location: payload
        }
      });
    },
    setUser(state, { user, token }) {
      return state.merge({
        user,
        token
      });
    },
    setChannel(state, payload) {
      return state.merge({
        roomId: payload
      });
    },
    setPlayedId(state, playedId) {
      return state.merge({
        playedId
      });
    }
  },
  effects: dispatch => ({
    loading() {},
    async confirmModalPermission() {
      console.log('teste');
      const confitrm = requestAuthorizationGeoLocation();
      console.log(confitrm);
      // const { status, permissions } = await Permissions.askAsync(
      //   Permissions.LOCATION
      // );
      // const currentLocation =
      //   status === 'granted' ? await Location.getCurrentPositionAsync() : null;
      // dispatch.application.permissions({
      //   latitude: currentLocation.coords.latitude,
      //   longitude: currentLocation.coords.longitude
      // });
    },
    async getRoom() {
      try {
        const data = await applicationApi.getRoom();
        dispatch.application.setChannel(data.room_id);
      } catch (e) {
        console.log(e);
      }
    }
  }),
  logics: [
    {
      type: '*',
      latest: true,
      process({ action }, dispatch, done) {
        if (action.meta && action.meta.loading) {
          dispatch.application.setLoading(action.meta.loading.visible);
        }
        done();
      }
    }
  ]
};

export default application;
