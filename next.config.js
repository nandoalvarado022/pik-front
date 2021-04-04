/*const compose = require('next-compose')
const withOffline = require('next-offline')
const withSass = require('@zeit/next-sass');

const sassConfig = {
	exportPathMap: function () {
		return {
			'/': { page: '/' }
		}
	}
}

const nextConfig = {
	dontAutoRegisterSw: true
}

const styles = compose([
	[withOffline, nextConfig],
	[withSass, sassConfig],
]);

module.exports = styles;*/

/*const path = require('path')

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}*/