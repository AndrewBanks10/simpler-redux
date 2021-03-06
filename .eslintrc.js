const path = require('path')

module.exports = {
	"parser": "babel-eslint",
	"plugins": [
		"babel",
		"react"
	],
	"settings": {
		"import/resolver": {
			"webpack": {
				"config": path.join(__dirname, "devtools/webpack.config.dev.js")
			}
		}
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"sourceType": "module",
		"ecmaVersion": 8
	},

  "extends": [
		"standard",
		"standard-react",
		"plugin:import/warnings",
		"plugin:import/errors"
	],
	"env": {
		"amd": true,
		"browser": true,
		"jquery": true,
		"node": true,
		"es6": true,
		"worker": true,
		"mocha": true
	},
	"rules": {
		"react/prop-types": 0,
		"react/jsx-boolean-value": 0
	}
}