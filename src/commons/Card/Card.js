import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Header,
  Content,
  Card as CardNative,
  CardItem as CardItemNative,
  Text,
  Body
} from 'native-base';
import { element, array, oneOfType } from 'prop-types';

export const Card = ({ children }) => (
  <CardStyled>
    <CardItem>{children}</CardItem>
  </CardStyled>
);

const CardStyled = styled(CardNative)`
  border-radius: 10;
`;

const CardItem = styled(CardItemNative)`
  border-radius: 10;
`;

Card.propTypes = {
  children: oneOfType([element, array])
};
