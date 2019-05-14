import React from 'react';
import { Send as SendNative } from 'react-native-gifted-chat';
import { ActivityIndicator as ActivityIndicatorNative } from 'react-native';
import styled from 'styled-components';

export const Send = props => (
	<Choose>
		<When condition={props.loadingMessage}>
			<ActivityIndicator size="small" />
		</When>
		<Otherwise>
			<SendNative alwaysShowSend {...props} />
		</Otherwise>
	</Choose>
);

const ActivityIndicator = styled(ActivityIndicatorNative)`
	top: 10;
	right: 15;
	position: absolute;
`;
