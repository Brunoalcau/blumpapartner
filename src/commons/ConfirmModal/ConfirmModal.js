import React from 'react';
import styled from 'styled-components';
import { func, oneOfType, element, array, string } from 'prop-types';
import Modal from 'react-native-modal';

// locals
import { Button } from '../Button';
import { Text } from '../Text';

export const ConfirmModal = ({
  visible,
  cancelText = 'Cancelar',
  confirmText = 'Aceitar',
  bodyText = '',
  onCancel,
  onConfirm
}) => (
  <Modal isVisible={visible}>
    <Container>
      <Body>
        <Text inverted>{bodyText}</Text>
      </Body>
      <Footer>
        <ButtonFooter tertiary onPress={onConfirm}>
          <Text>{confirmText}</Text>
        </ButtonFooter>
        <ButtonFooter inverted onPress={onCancel}>
          <Text inverted>{cancelText}</Text>
        </ButtonFooter>
      </Footer>
    </Container>
  </Modal>
);

ConfirmModal.propTypes = {
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
  cancelText: string,
  confirmText: string
};

const Header = styled.View`
  border-bottom-color: ${props => props.theme.border};
  border-bottom-width: 1px;
  padding-vertical: 10;
  padding-horizontal: 10;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`;

const Body = styled.View`
  padding-vertical: 10;
  padding-horizontal: 10;
  align-items: center;
  justify-content: center;
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
  padding-horizontal: 15;
  padding-vertical: 15;
  width: 100%;
`;
