import React from "react";
import styled, { css } from "styled-components/native";
import { isNumber } from "lodash";
import { compose, withProps, pure } from "recompose";
import { TouchableOpacity, ActivityIndicator } from "react-native";

// Locals
import { theme } from "~/config";
function renderIndicator({ loading, activityIndicatorColor }) {
  if (loading) {
    return (
      <ActivityIndicatorStyled
        color={activityIndicatorColor || theme["text"]}
      />
    );
  }
  return null;
}

function renderChildren({ loading, children }) {
  if (!loading) {
    return children;
  }
  return null;
}

const enhancedButton = compose(
  withProps(({ onPress }) => ({
    onPress: e => {
      if (typeof onPress === "function") {
        requestAnimationFrame(() => {
          onPress(e);
        });
      }
    }
  })),
  pure
)(props => {
  return (
    <TouchableOpacity {...props}>
      {renderIndicator(props)}
      {renderChildren(props)}
    </TouchableOpacity>
  );
});

export const Button = styled(enhancedButton)`
  background: ${props => props.background || "rgba(0,0,0,0)"};
  border-radius: ${props =>
    isNumber(props.borderRadius)
      ? props.borderRadius
      : props.theme.borderRadius};
  align-items: center;
  justify-content: center;
  padding-top: 15;
  padding-right: 15;
  padding-left: 15;
  padding-bottom: 15;
  flex-direction: row;
  ${props =>
    props.success &&
    css`
      background: ${props => props.theme.success};
    `}

  ${props =>
    props.danger &&
    css`
      background: ${props => props.theme.danger};
    `}

  ${props =>
    props.warning &&
    css`
      background: ${props => props.theme.warning};
    `}
    
  ${props =>
    props.transparent &&
    css`
      padding-top: 0;
      padding-right: 0;
      padding-left: 0;
      padding-bottom: 0;
    `}
  ${props =>
    props.tertiary &&
    css`
      background: ${props => props.theme.tertiary};
    `}

    ${props =>
      props.inverted &&
      css`
        background: ${props => props.theme.disabled};
      `}

    ${props =>
      props.primary &&
      css`
        background: ${props => props.theme.primary};
      `}
`;
const ActivityIndicatorStyled = styled(ActivityIndicator)`
  height: 18;
`;
