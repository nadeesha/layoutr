(function() {
	'use strict';

	var tabs = function ()  {
		var init = function(config, callback) {
			$.get('components/tabs/tabs.html', function(view) {
				config.setView(view);
				callback();
			});
		};

		return {
			init: init
		};
	};

	window.layoutr.components.tabs = tabs;
	console.debug('tabs components appended');
})();