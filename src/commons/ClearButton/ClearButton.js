import React from 'react';
import { number, func } from 'prop-types';
// Locals
import { Button } from '../Button';
import { Text } from '../Text';

export const ClearButton = ({ total, onPress }) => (
	<Button transparent onPress={onPress}>
		<Text>{`Limpar${total ? ` (${total})` : ''}`}</Text>
	</Button>
);

ClearButton.propTypes = {
	total: number,
	onPress: func
};
