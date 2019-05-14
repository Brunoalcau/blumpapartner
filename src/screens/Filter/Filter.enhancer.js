import {compose} from 'recompose';
import {connect} from 'react-redux';

const mapStateToProps = ({filter}) => ({
	fields: filter.fields,
	filterCount: filter.count
});

const mapDispatchToProps = ({filter}) => ({
	apply: filter.apply,
	clear: filter.clear
});

export const enhancer = compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
);
