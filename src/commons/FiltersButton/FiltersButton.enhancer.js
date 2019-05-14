import {compose} from 'recompose';
import {connect} from 'react-redux';
const mapStateToProps = ({filter}) => ({
	filterCount: filter.count
});

export const enhancer = compose(connect(mapStateToProps));
