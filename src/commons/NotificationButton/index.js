import React from 'react';
import styled from 'styled-components';

import {Button} from '../Button';
import {Text} from '../Text';

export const NotificationButton = ({notifications, children, ...props}) => (
	<ButtonIcon {...props}>
		<If condition={notifications}>
			<Notification>
				<Text size={8}>{notifications}</Text>
			</Notification>
		</If>
		{children}
	</ButtonIcon>
);

const ButtonIcon = styled(Button)`
	padding-top: 10;
	padding-right: 10;
	padding-left: 10;
	padding-bottom: 10;
`;

const Notification = styled.View`
	background: ${props => props.theme.warning};
	width: 15;
	height: 15;
	border-radius: 10;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 1;
	right: 0;
	top: 1;
`;
