import React from 'react';
import { object, bool, func } from 'prop-types';
import styled from 'styled-components';
import withRematch from 'with-rematch';
import Immutable from 'seamless-immutable';
// Locals
import {
  Wrapper,
  TopBar,
  BackButton,
  ServiceInfo,
  ConfirmModal
} from '~/commons';

const initState = Immutable({
  visible: false
});

const model = {
  state: initState,
  reducers: {
    visible(state, payload) {
      return state.merge({
        visible: payload
      });
    }
  },
  effects: actions => ({
    openConfirm(payload) {
      actions.visible(payload);
    },
    async cancel(payload, state, { onCancel }) {
      try {
        await onCancel(payload);
        actions.visible(false);
      } catch (e) {
        actions.visible(false);
      }
    }
  })
};

export const ServiceDetail = withRematch(model)(
  ({ item, visible, checkin, actions, state, navigation, going, checkout }) => (
    <Wrapper>
      <TopBar title="Serviço" leftComponent={<BackButton />} />
      <Content loading={visible}>
        <ServiceInfo
          item={item}
          cancel={() => actions.openConfirm(true)}
          checkin={checkin}
          navigation={navigation}
          going={going}
          checkout={checkout}
        />
      </Content>

      <ConfirmModal
        visible={state.visible}
        cancelText="Quero sair deste serviço"
        confirmText="Quero continuar neste serviço"
        bodyText="Deseja realmente cancelar este serviço?"
        onConfirm={() => actions.openConfirm(false)}
        onCancel={() => actions.cancel(item.id)}
      />
    </Wrapper>
  )
);

ServiceDetail.propTypes = {
  item: object,
  visible: bool,
  onCancel: func,
  checkin: func,
  state: object,
  actions: object,
  going: func,
  checkout: func
};

const Content = styled(Wrapper)`
  padding-left: 15;
  padding-right: 15;
  padding-top: 15;
`;
