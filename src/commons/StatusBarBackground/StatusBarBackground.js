import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

// locals
export const StatusBarBackground = styled.View.attrs(props => ({
  color: props.color || props.theme.bg
}))`
  z-index: 1;
  height: ${Platform.OS === 'ios' ? 20 : 0};
  background-color: ${props => props.color};
`;
