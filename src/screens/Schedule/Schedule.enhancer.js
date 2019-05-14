import {compose, lifecycle} from 'recompose';
import {connect} from 'react-redux';

const mapStateToProps = ({schedule}) => ({
  histories: schedule.histories,
  loadingHistory: schedule.loadingHistory,
  services: schedule.services,
  loadingDone: schedule.loadingDone
});

const mapDispatchToProps = ({schedule}) => ({
  getHistory: schedule.getHistory,
  getNext: schedule.getNext
});
export const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    async componentDidMount() {
      await this.props.getHistory();
      await this.props.getNext();
    }
  })
);
