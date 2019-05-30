import { compose } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => ({
	user: application.user,
	channel: application.roomId
});
export const enhancer = compose(connect(mapStateToProps));
