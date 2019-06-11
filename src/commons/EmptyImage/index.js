import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { string } from "prop-types";
// Locals
import { images } from "~/config";

import { EmptyText } from "../EmptyText";

export const EmptyImage = ({ text }) => (
	<Wrapper>
		<NotFound source={images.notService} />
		<EmptyText>{text}</EmptyText>
	</Wrapper>
);

EmptyImage.propTypes = {
	text: string
};

const Wrapper = styled.View`
	flex: 2;
	justify-content: center;
	align-items: center;
`;

const NotFound = styled(Image)`
	height: 250;
	width: 250;
`;
