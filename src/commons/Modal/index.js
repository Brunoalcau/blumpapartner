import React from 'react';
import styled from 'styled-components';
import { func, oneOfType, element, array, bool, string } from 'prop-types';

// locals
import { Text, Button } from '~/commons';

export const Modal = ({
  visible = false,
  transparent = true,
  animationType = 'fade',
  children
}) => (
  <Wrapper>
    <ModalNative
      visible={visible}
      transparent={transparent}
      animationType={animationType}
    >
      <Wrapper>{children}</Wrapper>
    </ModalNative>
  </Wrapper>
);

Modal.propTypes = {
  children: oneOfType([element, array, string]),
  transparent: bool,
  animationType: string
};

const Wrapper = styled.View``;
