$(function() {
	'use strict';

	var layout;

	(function loadLayout() {
		layout = JSON.parse(localStorage.getItem('page'));
	})();

	$.ajax({
		url: 'generate_files.jag',
		method: 'PUT',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(layout.gridsterLayout),
		success: function() {
			setupPage();
		}
	});

	function setupPage() {
		var bootstrapLayout = new bsgridster(layout.gridsterLayout, null, 'lr-box');
		console.debug(bootstrapLayout.getHtml());
		$('#lr-grid').html(bootstrapLayout.getHtml());

		$.each($('.lr-box'), function() {
			var box = this;

			$.ajax({
				url: 'component-gen/' + box.id + '.jag',
				method: 'GET',
				success: function(data) {
					$(box).html(data);
				}
			});
		});
	}
});