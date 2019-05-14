import React from 'react';
import styled from 'styled-components';
import {NetInfo, Dimensions} from 'react-native';
// Local
import {Text} from '../Text';

const {width} = Dimensions.get('window');

export const OffineNotive = () => (
  <Wrapper>
    <Text>No Internet Connection</Text>
  </Wrapper>
);

const Wrapper = styled.View`
  background-color: ${props => props.theme.danger};
  height: 30;
  justify-content: center;
  position: absolute;
  top: 30;
  flex-direction: row;
  width: ${width};
`;
