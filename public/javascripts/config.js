/*global require */

// Ermahgerd confliggerashun!
require.config({
  // [RequireJS](http://requirejs.org/) 2.0+ plus has error callbacks (errbacks)
  // which provide per-require error handling. To utilize this feature
  // enforceDefine must be enabled and non-AMD dependencies must be shimmed.
  enforceDefine: true,

    // shim underscore & backbone (cause we use the non AMD versions here)
	shim: {
		'dom': {
			exports: '$',
			deps: ['jquery'] // switch to the DOM-lib of your choice
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'dom'],
			exports: 'Backbone'
		},
    'backbone-overrides': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'handlebars-helpers': {
      deps: ['handlebars'],
      exports: 'Handlebars'
    },
		'deferred': {
			exports: 'Deferred',
			deps: ['dom']
		}
	},
	// paths
	paths: {
		// jQuery
		jquery: '../../../aura/lib/jquery/jquery',

		// Underscore
		underscore: '../../../aura/lib/underscore',

		// Set the base library
		dom: '../../../aura/lib/dom',
		base: '../../../aura/base/jquery',

		// Aura
		aura_core: '../../../aura/mediator',
		aura_perms: '../../../aura/permissions',
		aura_sandbox: '../../../aura/facade',

		// Backbone Extension
		core: '../../../extensions/backbone/mediator',
		sandbox: '../../../extensions/backbone/facade',
		text: '../../../extensions/backbone/lib/text',
		backbone: '../../../extensions/backbone/lib/backbone',
    localstorage: '../../../extensions/backbone/lib/localstorage',
		'backbone-overrides': '../../../extensions/backbone/lib/backbone-overrides',

    // Handlebars Extension
    handlebars:  '../../../extensions/backbone/lib/handlebars.min',
    'handlebars-helpers':  '../../../extensions/backbone/lib/handlebars-helpers',

		// Todos App
		perms: '../../../apps/todos/js/permissions'
	}
});
