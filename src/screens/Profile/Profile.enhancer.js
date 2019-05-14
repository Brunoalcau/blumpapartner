import {compose, lifecycle} from 'recompose';
import {connect} from 'react-redux';

const mapStateToProps = ({profile}) => ({
  item: profile.item,
  loading: profile.loading
});

const mapDispatchToProps = ({profile}) => ({
  get: profile.get
});
export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.get();
    }
  })
);
