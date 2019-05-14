import React from 'react';
import {bool, func} from 'prop-types';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
  View
} from 'react-native';
import {
  compose,
  pure,
  branch,
  withProps,
  renderComponent,
  setPropTypes,
  defaultProps
} from 'recompose';
import styled, {css} from 'styled-components';

// Local
import {theme} from '~/config';

const enhancer = compose(
  setPropTypes({
    loading: bool,
    refreshing: bool,
    onRefresh: func
  }),
  defaultProps({
    loading: false,
    refreshing: false
  }),
  withProps(({progressViewOffset, onRefresh, refreshing}) => ({
    refreshControl: onRefresh && (
      <RefreshControl
        progressViewOffset={progressViewOffset}
        colors={[theme.textSecondary]}
        tintColor={theme.textSecondary}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    )
  })),
  branch(
    ({loading}) => loading,
    renderComponent(props => (
      <View {...props}>
        <LoadingView>
          <ActivityIndicator color={theme.textSecondary} size="small" />
        </LoadingView>
      </View>
    ))
  ),
  pure
);

const loadingWrapper = WrapperElement =>
  enhancer(props => {
    return <WrapperElement {...props}>{props.children}</WrapperElement>;
  });

const LoadingView = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Wrapper = styled(loadingWrapper(View)).attrs(props => ({
  showsVerticalScrollIndicator: props.showsVerticalScrollIndicator || false,
  behavior: props.behavior || 'padding'
}))`
  flex: 1;
  background: ${props => props.theme.bg};

  ${props =>
    props.secondary &&
    css`
      background: ${props => props.theme.bgSecondary};
    `};
`;

export const ScrollWrapper = Wrapper.withComponent(loadingWrapper(ScrollView));

export const KeyboardAvoidingWrapper = Wrapper.withComponent(
  Platform.OS === 'ios'
    ? loadingWrapper(KeyboardAvoidingView)
    : loadingWrapper(View)
);
