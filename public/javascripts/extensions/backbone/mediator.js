/* jslint sloppy:true */
/* global define */

// ## Core Extension
// @fileOverview Extend the aura-core mediator
define(['aura_core', 'backbone', 'localstorage', 'handlebars'], function(core, Backbone, Store, Handlebars) {

	var mediator = Object.create(core);
	mediator.data.Store = Store;
	mediator.mvc = Backbone;
  mediator.template.parse = Handlebars.compile;

	return mediator;

});