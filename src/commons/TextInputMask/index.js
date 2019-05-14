import React from 'react';
import {Item} from 'native-base';
import {TextInputMask as TextInputMaskNative} from 'react-native-masked-text';
import styled, {css} from 'styled-components';

export const TextInputMask = styled(TextInputMaskNative)`
  height: 45;
  padding-left: 8;
  border-radius: 10;
  padding-right: 5;
  border-width: 1;
  border-color: ${props => props.theme.border};
  ${props =>
    props.validation &&
    css`
      border-color: ${props => props.theme.danger};
    `};
`;

// #D9D5DC
