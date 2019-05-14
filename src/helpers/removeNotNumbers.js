export const removeNotNumbers = text => {
	return text.replace(/[^0-9]+/g, '');
};
