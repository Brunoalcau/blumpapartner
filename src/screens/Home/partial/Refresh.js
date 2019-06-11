import React from "react";
import { Icon as IconNative } from "native-base";
import styled from "styled-components";
import { Button } from "~/commons";
// Locals

// import { Icon } from "~/commons";

const Icon = styled(IconNative)`
	color: ${props => props.theme.secondary};
	font-size: 25;
	font-weight: bold;
`;

const ButtonIcon = styled(Button)`
	padding-top: 10;
	padding-right: 10;
	padding-left: 10;
	padding-bottom: 10;
`;
export const Refresh = function({ action }) {
	return (
		<ButtonIcon onPress={action}>
			<Icon name="ios-refresh" />
		</ButtonIcon>
	);
};
// <ion-icon name="refresh"></ion-icon>
