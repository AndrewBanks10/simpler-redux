const path = require('path')

module.exports = {
	"parser": "babel-eslint",
	"plugins": [
		"react",
		"babel"
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
        "sourceType": "module"
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