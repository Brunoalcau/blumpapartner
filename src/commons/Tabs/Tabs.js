import React from 'react';
import styled, {css} from 'styled-components';
import {func, oneOfType, element, array} from 'prop-types';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {TouchableOpacity as TouchableOpacityNative} from 'react-native';
import Immutable from 'seamless-immutable';
import withRemacth from 'with-rematch';

// Locals
import {Text} from '../Text';

const initialState = new Immutable({
  activated: 0
});

const model = {
  state: initialState,
  reducers: {
    setActivated(state, payload) {
      return state.merge({
        activated: payload
      });
    }
  },
  effects: actions => ({
    onPress(index) {
      actions.setActivated(index);
    }
  }),
  lifecycle: {
    componentDidMount() {
      this.actions.setActivated(this.props.tabActivated);
    }
  }
};

function WithTabs({children, actions, state}) {
  return (
    <Grid>
      <Row size={10}>
        {React.Children.map(children, (item, index) => (
          <TouchableOpacity
            activated={state.activated === index}
            onPress={() => actions.onPress(index)}
          >
            <Text weight="600" inverted={state.activated !== index}>
              {item.props.heading}
            </Text>
          </TouchableOpacity>
        ))}
      </Row>
      <Body size={90}>
        {React.Children.map(children, (item, index) => (
          <Tab key={index} active={state.activated === index}>
            {item}
          </Tab>
        ))}
      </Body>
    </Grid>
  );
}

WithTabs.propTypes = {
  children: oneOfType([element, array])
};

export const Tabs = withRemacth(model)(WithTabs);

const Body = styled(Row)`
  padding-top: 0;
  width: 100%;
`;

const TouchableOpacity = styled(TouchableOpacityNative)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.secondary};
  ${props =>
    props.activated &&
    css`
      background-color: ${props => props.theme.tertiary};
    `}
`;

const Tab = styled.View`
  position: absolute;
  top: 0;
  left: ${props => (props.active ? 0 : '100%')};
  width: 100%;
  height: 100%;
`;
