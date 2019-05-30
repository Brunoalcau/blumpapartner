import React from 'react';
import styled, { css } from 'styled-components';
import { Footer as FooterNative } from 'native-base';
import { func, string } from 'prop-types';
// Locals
import { Button as ButtonNative } from '../Button';
import { Text } from '../Text';

export const FooterButton = ({
  onPress,
  textButton = 'Salvar',
  full,
  ...props
}) => (
  <Footer full={full}>
    <Button {...props} onPress={onPress}>
      <Text>{textButton}</Text>
    </Button>
  </Footer>
);

FooterButton.propTypes = {
  onPress: func,
  textButton: string
};

const Button = styled(ButtonNative)`
  width: 100%;
`;
const Footer = styled(FooterNative)`
  border-top-width: 0.5;
  border-color: ${props => props.theme.border};
  height: 75;
  background-color: ${props => props.theme.secondary};
  padding-top: 15;
  padding-bottom: 15;
  padding-right: 15;
  padding-left: 15;
  width: 100%;
  ${props =>
    props.full &&
    css`
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
      padding-left: 0;
    `}
`;
