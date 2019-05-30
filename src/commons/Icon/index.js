import React from 'react';
import styled from 'styled-components';
import Image from 'react-native-remote-svg';
import { string, number } from 'prop-types';
import { Icon as IconNative } from 'native-base';
// Locals
import { images } from '~/config';

// <ion-icon name="contact"></ion-icon>
export const Icon = props => <IconStyled {...props} />;

Icon.propTypes = {
	name: string.isRequired,
	size: number
};

const IconStyled = styled(IconNative)`
	color: ${props => props.theme.bgSecondary};
`;
