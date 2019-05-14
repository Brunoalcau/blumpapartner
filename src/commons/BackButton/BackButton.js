import React from 'react';
import styled from 'styled-components';
import { Icon as IconNative } from 'native-base';
import { string } from 'prop-types';
import { withNavigation } from 'react-navigation';

// Locals
import { Button } from '../Button';

export const BackButton = withNavigation(
	({ icon = 'arrow-back', navigation }) => (
		<Button transparent onPress={() => navigation.goBack()}>
			<Icon size={15} name={icon} />
		</Button>
	)
);

BackButton.propTypes = {
	icon: string
};

const Icon = styled(IconNative)`
	font-size: 22;
	color: ${props => props.theme.secondary};
`;
