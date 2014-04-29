(function() {
	'use strict';

	var jagapp = function($container) {
		var code = '<%="foo">';

		var init = function(data, callback) {
			$container.css({
				'padding': '20px',
				'background-color': 'lightgray',
				'color': 'gray'
			});

			set(data || code);
			callback();
		};

		var get = function() {
			return code;
		};

		var set = function(newCode) {
			code = newCode;
			$container.html(newCode);

			var $editButton = $('<span class="glyphicon glyphicon-edit lr-edit-btn" data-lr-edit-for="' + $container.attr('id') + '"></span>');
			$container.prepend($editButton);
		};

		return {
			init: init,
			get: get,
			set: set
		};
	};

	window.layoutr.components.jagapp = jagapp;
	console.debug('jagapp components appended');
})();