import Immutable from 'seamless-immutable';
import { pickBy, identity, omit } from 'lodash';

// Locals
import { goBack } from '~/helpers';

const initialState = Immutable({
  fields: {},
  payment: {},
  count: 0
});

const filter = {
  name: 'filter',
  state: initialState,
  reducers: {
    fields(state, { fields, count }) {
      return state.merge({
        fields: fields,
        count
      });
    },
    payment(state, { fields, count }) {
      return state.merge({
        payment: fields,
        count
      });
    }
  },
  effects: dispatch => ({
    apply(fields) {
      const count = Object.keys(pickBy(omit(fields, 'type'), identity)).length;
      dispatch.filter[fields.type]({ fields, count });
    },
    clear(type) {
      dispatch.filter[type](initialState);
    }
  }),
  logics: [
    {
      type: ['filter/fields', 'filter/payment'],
      latest: true,
      process(context, dispatch, done) {
        goBack();
        done();
      }
    }
  ]
};

export default filter;
