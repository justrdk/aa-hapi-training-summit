require.config({
	paths: {
		"jquery": '../libs/jquery-2.1.1',
		"can": "../libs/canjs.com-2.1.3/amd-dev/can",
		"bootstrap": '../libs/bootstrap.min',
		'noty': '../libs/jquery.noty.packaged.min'
	},
	shim: {
		"jquery": {
			exports: '$'
		},
		"can": {
			exports: 'can'
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'noty': {
			deps: ['jquery']
		}
	}
});

requirejs(['bootstrap', 'noty', 'scripts/router']);