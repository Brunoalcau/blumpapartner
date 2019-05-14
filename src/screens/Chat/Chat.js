import React from 'react';
import {
  Footer as FooterNative,
  Container,
  Item,
  Input as InputNative
} from 'native-base';
import Immutable from 'seamless-immutable';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Formik } from 'formik';
import * as yup from 'yup';
import { get } from 'lodash';
import styled from 'styled-components';
import { Row, Grid, Col } from 'react-native-easy-grid';
import { func, string, object, bool } from 'prop-types';
// Locals
import {
  Wrapper,
  TopBar,
  BackButton,
  Text,
  Chat as ChatNative
} from '~/commons';
import { theme } from '~/config';

export const Chat = ({
  topBartitle = 'Fale com o Blumpa',
  sendMessage,
  messages,
  user,
  loadPreviousMessages,
  navigation,
  openMenu,
  onCleanAttachment,
  currentAttachment,
  loadingMessage,
  loading
}) => (
  <Container>
    <TopBar title={topBartitle} leftComponent={<BackButton />} />
    <ChatNative
      onLoadEarlier={loadPreviousMessages}
      isAnimated={true}
      refreshing={false}
      timeFormat="HH:mm"
      dateFormat="DD/MM/YYYY"
      user={user}
      onSend={sendMessage}
      label="Enviar"
      placeholder=""
      messages={messages}
      navigation={navigation}
      onPressActions={openMenu}
      currentAttachment={currentAttachment}
      onCleanAttachment={onCleanAttachment}
      loadingMessage={loadingMessage}
      loading={loading}
    />
  </Container>
);

Chat.propTypes = {
  loadPreviousMessages: func,
  topBartitle: string,
  sendMessage: func,
  user: string,
  navigation: object,
  openMenu: func,
  onCleanAttachment: func,
  currentAttachment: object,
  loadingMessage: bool,
  loading: bool
};
Chat.navigationOptions = {
  header: null
};

const Footer = styled(FooterNative)`
  width: 100%;
`;

const WrapperItem = styled(Item)`
  border-radius: 30;
  height: 50;
`;
const WrapperForm = styled.View`
  width: 100%;
  justify-content: center;
`;

const Input = styled(InputNative)`
  font-size: 14;
  top: 1;
`;
