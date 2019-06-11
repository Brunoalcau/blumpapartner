import React from "react";
import styled from "styled-components";
import { Icon } from "native-base";
import { withNavigation } from "react-navigation";
import { number, object, string } from "prop-types";
// Local
import { NotificationButton } from "../NotificationButton";

export const FiltersButton = withNavigation(
	({ navigation, filterCount, routeName }) => (
		<NotificationButton
			notifications={filterCount}
			onPress={() => navigation.navigate({ routeName: routeName })}
		>
			<IconFilter name="ios-funnel" />
		</NotificationButton>
	)
);

FiltersButton.propsTypes = {
	filterCount: number,
	navigation: object,
	routeName: string
};

const IconFilter = styled(Icon)`
	font-size: 22;
	color: ${props => props.theme.secondary};
`;
