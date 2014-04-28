(function() {
	'use strict';

	var jagapp = function() {
		var init = function(config, callback) {
			config.setCode('<%="foo">');
			callback();
		};

		return {
			init: init
		};
	};

	window.layoutr.components.jagapp = jagapp;
	console.debug('jagapp components appended');
})();