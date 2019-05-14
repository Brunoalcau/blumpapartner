import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = ({ next, application }) => ({
  item: next.item,
  loading: next.loading
});

const mapDispatchToProps = ({ next, services }) => ({
  get: next.get,
  checkin: services.checkin,
  going: services.going,
  checkout: services.checkout
});

export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    async componentWillMount() {
      this.props.get();
    }
  })
);
