const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
