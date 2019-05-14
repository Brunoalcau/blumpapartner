import React from 'react';
import styled from 'styled-components';
import {AsyncStorage} from 'react-native';
import withRematch from 'with-rematch';
import {ActivityIndicator} from 'react-native';

// Locals
import {images} from '~/config';
const initState = {};
const model = {
  state: initState,
  reducers: {
    get() {}
  }
};

const AuthView = () => (
  <Wrapper>
    <ActivityIndicator />
  </Wrapper>
);

export const Auth = withRematch(model)(AuthView);

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
`;

Auth.navigationOptions = {
  header: null
};
