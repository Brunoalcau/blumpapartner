import React from 'react';
import styled from 'styled-components';
import {func, string, object} from 'prop-types';
import Modal from 'react-native-modal';
// locals
import {Text, Button} from '~/commons';
import {ServiceInfo} from './ServiceInfo';

export const ConfirmModalService = ({
  visible,
  cancelText = 'Cancelar',
  confirmText = 'Aceitar',
  onCancel,
  onConfirm,
  item
}) => (
  <Modal isVisible={visible} backdropOpacity={0.5}>
    <Container>
      <Header>
        <ServiceInfo item={item} />
      </Header>
      <Footer>
        <Button tertiary onPress={onConfirm}>
          <Text>{confirmText}</Text>
        </Button>
        <ButtonFooter inverted onPress={onCancel}>
          <Text inverted>{cancelText}</Text>
        </ButtonFooter>
      </Footer>
    </Container>
  </Modal>
);

ConfirmModalService.propTypes = {
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
  cancelText: string,
  confirmText: string,
  item: object
};

const Header = styled.View`
  padding-top: 15px;
  padding-horizontal: 15;
  padding-vertical: 15;
`;

const Container = styled.View`
  background-color: ${props => props.theme.secondary};
  margin-left: 20;
  margin-right: 20;
  border-radius: 10;
`;

const ButtonFooter = styled(Button)`
  margin-top: 10;
  width: 100%;
`;

const Footer = styled.View`
  bottom: 0;
  width: 100%;
  padding-horizontal: 15;
  padding-vertical: 15;
`;
