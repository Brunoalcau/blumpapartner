import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

// Locals
import { images } from '~/config';

import { EmptyText } from '../EmptyText';

export const EmptyImage = () => (
	<Wrapper>
		<NotFound source={images.notService} />
		<EmptyText>Você ainda não tem nenhum serviço agendado</EmptyText>
	</Wrapper>
);

const Wrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const NotFound = styled(Image)`
	height: 250;
	width: 250;
`;
