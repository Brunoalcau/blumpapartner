import React from 'react';
import styled from 'styled-components';
import Image from 'react-native-remote-svg';
import {string} from 'prop-types';
import {Icon as IconNative} from 'native-base';
// Locals
import {images} from '~/config';

// <ion-icon name="contact"></ion-icon>
export const Icon = ({name, size}) => <IconStyled name={name} />;

Icon.propTypes = {
	name: string.isRequired
};

const IconSvg = styled(Image)`
	width: ${props => props.size || 25};
	height: ${props => props.size || 25};
`;

const IconStyled = styled(IconNative)`
	color: ${props => props.theme.bgSecondary};
	font-size: ${props => props.size || 28};
`;
