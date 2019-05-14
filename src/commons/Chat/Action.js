// import {Bubble as BubbleNative} from 'react-native-gifted-chat';
import React from 'react';
import { ActionSheet, Icon as IconNative } from 'native-base';
import styled from 'styled-components';
import Immutable from 'seamless-immutable';

// Locals
import { Button } from '../Button';

export const Action = ({ onPress, onCleanAttachment, currentAttachment }) => (
  <Wrapper>
    <Choose>
      <When condition={currentAttachment}>
        <Button transparent onPress={onCleanAttachment}>
          <Icon name="image" />
        </Button>
      </When>
      <Otherwise>
        <Button transparent onPress={onPress}>
          <Icon name="attach" />
        </Button>
      </Otherwise>
    </Choose>
  </Wrapper>
);

const Icon = styled(IconNative)`
  color: ${props => props.theme.icon};
  font-size: 23;
  margin-left: 20;
  margin-bottom: 10;
  transform: rotate(30deg);
`;

// image

const Wrapper = styled.View``;
