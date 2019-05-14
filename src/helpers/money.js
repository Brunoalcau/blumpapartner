export const money = function(number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'decimal',
		currency: 'BRL'
	}).format(number / 100);
};
