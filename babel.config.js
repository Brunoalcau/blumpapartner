module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		'jsx-control-statements',
		[
			'babel-plugin-root-import',
			{
				rootPathSuffix: 'src',
				rootPathPrefix: '~'
			}
		],
		[
			'babel-plugin-inline-import',
			{
				extensions: ['.svg']
			}
		]
	]
};
