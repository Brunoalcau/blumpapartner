import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { array, func, bool, object } from 'prop-types';
import { ActionSheet, Icon as IconNative } from 'native-base';
import Immutable from 'seamless-immutable';
import { omit } from 'lodash';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

// Locals
import { Wrapper } from '../Wrapper';
import { theme } from '~/config';
import { Bubble } from './Bubble';
import { Send } from './Send';
import { Action } from './Action';

export const Chat = ({
  messages,
  label,
  placeholder,
  onSend,
  user,
  isLoadingEarlier,
  onPressActions,
  sendLoading,
  clearAttachment,
  loading,
  ...props
}) => (
  <Choose>
    <When condition={loading}>
      <WrapperLoading>
        <ActivityIndicator size="small" />
      </WrapperLoading>
    </When>
    <Otherwise>
      <GiftedChat
        {...props}
        isLoadingEarlier={isLoadingEarlier}
        messages={messages}
        isAnimated
        onSend={onSend}
        user={{
          _id: user
        }}
        renderBubble={props => <Bubble {...props} />}
        renderSend={props => <Send loading={sendLoading} {...props} />}
        renderActions={props => (
          <Action onPress={onPressActions} {...omit(props, 'onPress')} />
        )}
        label={label}
        textStyle={{ color: theme.bgSecondary }}
        placeholder={placeholder}
      />
    </Otherwise>
  </Choose>
);

Chat.propsTypes = {
  messages: array,
  onPressActions: func,
  sendLoading: bool,
  currentAttachment: object,
  clearAttachment: func,
  loading: bool
};

const WrapperLoading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
