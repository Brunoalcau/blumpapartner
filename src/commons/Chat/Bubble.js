import React from 'react';
import {Bubble as BubbleNative} from 'react-native-gifted-chat';

// Locals
import {theme} from '~/config';

export const Bubble = props => (
  <BubbleNative wrapperStyle={wrapperStyle} textStyle={textStyle} {...props} />
);

const textStyle = {
  right: {
    color: theme.text
  },
  left: {
    color: theme.textInverted
  }
};
const wrapperStyle = {
  right: {
    backgroundColor: theme.bgSecondary
  },
  left: {
    backgroundColor: theme.disabled
  }
};
