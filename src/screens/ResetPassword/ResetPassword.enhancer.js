import {compose} from 'recompose';
import {connect} from 'react-redux';

const mapStateToProps = ({application, forgetPassword}) => ({
  visible: application.loading.visible,
  login: forgetPassword.login
});

const mapDispatchToProps = ({forgetPassword}) => ({
  resetPassword: forgetPassword.resetPassword
});
export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
