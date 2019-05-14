import Immutable from 'seamless-immutable';
import {omit} from 'lodash';
const confirmInitialState = {
  title: '',
  text: '',
  open: false,
  callbackAction: null
};

const initialState = Immutable({
  confirmDialog: confirmInitialState
});

const dialogs = {
  name: 'dialogs',
  state: initialState,
  reducers: {
    showConfirm(state, confirmDialog) {
      return state.merge({confirmDialog});
    },
    reset(state) {
      return state.merge({confirmDialog: confirmInitialState});
    }
  },
  effects: dispatch => ({
    hideCorfirm: (confirmed, {dialogs}) => {
      if (confirmed) {
        dispatch(dialogs.confirmDialog.callbackAction);
      }
      dispatch.dialogs.reset();
    }
  }),
  logics: [
    {
      type: '*',
      latest: true,
      transform({action}, next) {
        if (action.meta && action.meta.confirmDialog) {
          action.type = `${action.type}_to_confirm`;
        }
        next(action);
      }
    },
    {
      type: '*',
      latest: true,
      process({action}, dispatch, done) {
        if (action.meta && action.meta.confirmDialog) {
          dispatch.dialogs.showConfirm({
            ...action.meta.confirmDialog,
            callbackAction: {
              ...omit(action, ['meta.confirmDialog']),
              type: action.type.replace('_to_confirm', '')
            }
          });
        }
        done();
      }
    }
  ]
};

export default dialogs;
