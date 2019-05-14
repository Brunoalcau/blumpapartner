import React from 'react';
import styled from 'styled-components';
import {Image as ImageNative} from 'react-native';

export const Image = styled(ImageNative).attrs({
  resizeMethod: 'resize'
})``;
