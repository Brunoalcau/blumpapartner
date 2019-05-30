import React from 'react';
import styled from 'styled-components';
import { Icon } from 'native-base';
import { string, func, bool } from 'prop-types';
import withRematch from 'with-rematch';

// Locals
import { InputField, Button } from '~/commons';

export const Search = ({ value, onChangeText, clear }) => (
  <Wrapper>
    <InputField
      onChangeText={onChangeText}
      height={30}
      placeholder="Pesquisar"
      type="text"
    />
    <WrapperIcon name="search" />
  </Wrapper>
);

Search.propTypes = {
  value: string,
  onChangeText: func,
  clear: func
};

const Wrapper = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-top: 10;
  padding-bottom: 10;
  height: 50;
  background-color: ${props => props.theme['secondary']};
  border-bottom-color: ${props => props.theme['bg']};
  border-bottom-width: 1;
  position: relative;
`;

const WrapperIcon = styled(Icon)`
  top: 22;
  font-size: 18;
  right: 16;
  position: absolute;
  color: ${props => props.theme['border']};
  padding-left: 15;
`;
