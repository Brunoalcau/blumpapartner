import {compose, lifecycle} from 'recompose';
import {connect} from 'react-redux';

const mapStateToProps = ({goodHabits}) => ({
  item: goodHabits.item,
  loading: goodHabits.loading
});
const mapDispatchToProps = ({goodHabits}) => ({
  getManual: goodHabits.getManual
});

export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    async componentDidMount() {
      this.props.getManual();
    }
  })
);
