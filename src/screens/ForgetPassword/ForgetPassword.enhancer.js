import {compose} from 'recompose';
import {connect} from 'react-redux';

const mapStateToProps = ({application}) => ({
  visible: application.loading.visible
});

const mapDispatchToProps = ({forgetPassword}) => ({
  resetCode: forgetPassword.resetCode,
  resetPassword: forgetPassword.resetPassword
});
export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
