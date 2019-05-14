import { compose } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => ({
	user: application.user,
	channel: application.channel
});
export const enhancer = compose(connect(mapStateToProps));
