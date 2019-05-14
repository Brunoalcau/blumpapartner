import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

const mapStateToProps = ({ services, application, filter }) => ({
  items: services.items,
  loading: services.loading,
  confirmModalServiceOpened: services.confirmModalServiceOpened,
  selectService: services.selectService,
  permissions: application.permissions,
  fields: filter.fields
});

const mapDispatchToProps = ({ services, application }) => ({
  find: services.find,
  accept: services.accept,
  confirmModalServiceOpen: services.confirmModalServiceOpen,
  selectedService: services.selectedService,
  accept: services.accept,
  confirmModalPermission: application.confirmModalPermission
});

export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    async componentWillMount() {
      await this.props.find();
    },
    async componentDidUpdate(nextProps) {
      if (!isEqual(this.props.fields, nextProps.fields)) {
        await this.props.find(this.props.fields);
      }
    }
  })
);
