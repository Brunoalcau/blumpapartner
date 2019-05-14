import {compose} from 'recompose';
import {connect} from 'react-redux';

const mapStateToProps = ({authentication}) => ({
  error: authentication.error,
  loading: authentication.loading,
  isSignedIn: authentication.isSignedIn
});

const mapDispatchToProps = ({authentication}) => ({
  signin: authentication.signin
});

export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
