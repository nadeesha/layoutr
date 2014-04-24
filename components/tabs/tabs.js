(function(config) {
	'use strict';

	var tabs = {
		init: function init(config, callback) {
			$.get('components/tabs/tabs.html', function(view) {
				config.$element.html(view);
			});
		}
	}

	window.layoutr.components.tabs = tabs;
	console.debug('tabs components appended');
})();