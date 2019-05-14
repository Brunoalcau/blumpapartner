import React from 'react';
import styled from 'styled-components/native';

export const EmptyText = styled.Text`
  margin-top: 20;
  margin-right: 20;
  margin-left: 20;
  margin-bottom: 20;
  text-align: center;
  color: ${props => props.theme.textSecondary};
`;
