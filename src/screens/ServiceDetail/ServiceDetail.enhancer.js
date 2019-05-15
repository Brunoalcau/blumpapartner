import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = ({ service, application }) => ({
  item: service.item,
  visible: application.loading.visible
});

const mapDispatchToProps = ({ service, services }) => ({
  get: service.get,
  onCancel: service.onCancel,
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
    componentDidMount() {
      const { navigation } = this.props;
      this.props.get(navigation.getParam('id'), { loading: { visible: true } });
    }
  })
);
