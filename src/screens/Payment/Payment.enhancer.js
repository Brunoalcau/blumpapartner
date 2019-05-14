import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

const mapStateToProps = ({ payment, filter }) => ({
  allIds: payment.allIds,
  byId: payment.byId,
  stickyHeaderIndices: payment.stickyHeaderIndices,
  payment: filter.payment
});

const mapDispatchToProps = ({ payment }) => ({
  get: payment.get
});

export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    async componentWillMount() {
      this.props.get();
    },
    async componentDidUpdate(nextProps) {
      if (!isEqual(this.props.payment, nextProps.payment)) {
        await this.props.get(this.props.payment);
      }
    }
  })
);
