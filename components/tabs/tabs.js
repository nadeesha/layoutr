(function() {
	'use strict';

	var tabs = function($container) {
		var html;

		var init = function(data, callback) {
			if (data) {
				html = data;
				set(data);
				callback();
			} else {
				$.get('components/tabs/tabs.html', function(data) {
					html = data;
					set(html);
					callback();
				});
			}
		};

		var get = function() {
			return html;
		};

		var set = function(newCode) {
			html = newCode;
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

	window.layoutr.components.tabs = tabs;
	console.debug('tabs components appended');
})();