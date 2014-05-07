$(function() {
	'use strict';

	var layout = JSON.parse(localStorage.getItem('page'));

	var bootstrapLayout = new bsgridster(layout.gridsterLayout, null, 'lr-box');
	console.debug(bootstrapLayout.getHtml());
	$('#lr-grid').html(bootstrapLayout.getHtml());

	$.ajax({
		url: 'component-gen/rendered.jag',
		method: 'GET',
		success: function(data) {
			var $componentHtml = $(data);
			fillHtml($componentHtml);
		}
	});

	function fillHtml($componentHtml) {
		var components = {};

		$componentHtml.each(function() {
			components[this.id] = this.innerHTML;
		});

		$.each($('.lr-box'), function() {
			$(this).html(components[this.id]);
		});
	}
});