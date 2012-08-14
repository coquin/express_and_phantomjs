/*global define */
// ## Permissions Extension
// @fileOverview Extend the aura-core permissions
define(['aura_perms'], function (permissions) {

	permissions.extend({
		todo_form: {
			bootstrap: true,
			'todos-created': true
		},
		todos_list: {
			bootstrap: true
		},
		todos_stats: {
			bootstrap: true,
			'todos-created': true
		}
	});

	return permissions;

});