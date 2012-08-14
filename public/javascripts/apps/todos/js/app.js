/*global define */

if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

// Starts main modules
// Publishing from core because that's the way that Nicholas did it...
define(['core'], function(core) {
	core.start([
		{ channel: 'todo_form', element: '#todo_form' },
		{ channel: 'todos_list', element: '#todos_list' },
		{ channel: 'todos_stats', element: '#todos_stats' }
	]);
});
