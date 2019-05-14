import Immutable from 'seamless-immutable';
import { groupBy, reduce, map, find, filter, isEmpty } from 'lodash';
import moment from 'moment';

// Local
import { paymentApi } from '~/api';

const initialState = Immutable({
  byId: {},
  allIds: [],
  stickyHeaderIndices: []
});

const payment = {
  name: 'payment',
  state: initialState,
  reducers: {
    success(state, payload) {
      return state.merge({
        ...payload
      });
    },
    getError(state, payload) {
      return state.merge({
        error: payload
      });
    }
  },
  effects: dispatch => ({
    async get(context, state) {
      const start_date = !isEmpty(context)
        ? moment(context.initialDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : moment()
            .subtract(15, 'days')
            .format('YYYY-MM-DD');
      const end_date = !isEmpty(context)
        ? moment(context.lastDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : moment()
            .add(15, 'days')
            .format('YYYY-MM-DD');

      const data = await paymentApi.getById(
        state.application.user,
        start_date,
        end_date
      );
      const group = groupBy(data, ({ created_at }) =>
        created_at
          .split('-')
          .splice(0, 2)
          .join('-')
      );
      const keys = Object.keys(group);
      const payments = reduce(
        keys,
        (accumulation, current, index) => {
          const header = {
            id: current,
            send_date: current,
            header: true,
            total: reduce(
              group[current],
              (ac, cu) => {
                return ac + parseFloat(cu.amount_cents);
              },
              0
            )
          };
          // console.log();
          const body = map(group[current], item => ({
            ...item,
            header: false
          }));
          return [...accumulation, header, ...body];
        },
        []
      );
      const allIds = map(payments, ({ id }) => id);

      const byId = reduce(
        allIds,
        (accumulation, current) => {
          return {
            ...accumulation,
            [current]: find(payments, ({ id }) => current === id)
          };
        },
        {}
      );
      const stickyHeaderIndices = reduce(
        payments,
        (accumulation, current, index) => {
          const count = [];
          if (current.header) {
            return [index, ...accumulation];
          }
          return [...accumulation];
        },
        []
      );
      dispatch.payment.success({ byId, allIds, stickyHeaderIndices });
    }
  }),
  logics: [
    {
      type: 'payment/get',
      latest: true,
      process(contex, dispatch, done) {
        done();
      }
    }
  ]
};

export default payment;
