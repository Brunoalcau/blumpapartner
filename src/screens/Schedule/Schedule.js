import React from 'react';
import styled, {css} from 'styled-components';
import {array, bool, func} from 'prop-types';
import Immutable from 'seamless-immutable';
import withRemacth from 'with-rematch';
import {TouchableOpacity as TouchableOpacityNative} from 'react-native';

// Locals
import {Wrapper, TopBar, Tabs, Text} from '~/commons';
import {Completed} from './Completed';
import {History} from './History';

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
  })
};

export const ScheduleView = ({
  state,
  visible,
  actions,
  histories,
  services,
  getHistory,
  getNext,
  loadingHistory,
  loadingDone
}) => (
  <Wrapper>
    <TopBar title="Agenda" />
    <Wrapper>
      <Header>
        <HeaderItem
          onPress={() => actions.onPress(0)}
          actived={state.activated === 0}
        >
          <TabHeaderText actived={state.activated === 0} weight="bold">
            Próximo
          </TabHeaderText>
        </HeaderItem>
        <HeaderItem
          onPress={() => actions.onPress(1)}
          actived={state.activated === 1}
        >
          <TabHeaderText actived={state.activated === 1} weight="bold">
            Feito
          </TabHeaderText>
        </HeaderItem>
      </Header>
      <Body>
        <If condition={state.activated === 0}>
          <History
            notFountText="Nenhum serviços."
            loading={loadingHistory}
            items={services}
            onRefresh={() => getNext(null)}
          />
        </If>
        <If condition={state.activated === 1}>
          <History
            notFountText="Nenhum serviços."
            loading={loadingDone}
            items={histories}
            onRefresh={() => getHistory(null)}
          />
        </If>
      </Body>
    </Wrapper>
  </Wrapper>
);

ScheduleView.propTypes = {
  histories: array,
  visible: bool,
  getNext: func,
  getHistory: func,
  loadingHistory: bool,
  loadingDone: bool
};

export const Schedule = withRemacth(model)(ScheduleView);

const Content = styled.View``;

const Tab = styled.View`
  position: absolute;
  top: 0;
  left: ${props => (props.active ? 0 : '100%')};
  background-color: ${props => (props.active ? 'red' : 'blue')}
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  height: 50;
  background-color: ${props => props.theme.tertiary};
  flex-direction: row;
`;

const Body = styled.View`
  background-color: blue;
  flex: 1;
`;
const HeaderItem = styled(TouchableOpacityNative)`
  background-color: ${props => props.theme.secondary};
  width: 50%;
  height: auto;
  justify-content: center;
  align-items: center;
  ${props =>
    props.actived &&
    css`
      background-color: ${props => props.theme.tertiary};
    `}
`;

const BodyItem = styled.View``;

const TabHeaderText = styled(Text)`
  color: ${props => props.theme.textInverted};
  ${props =>
    props.actived &&
    css`
      color: ${props => props.theme.secondary};
    `}
`;
