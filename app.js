$(function() { //DOM Ready

	$(".gridster ul").gridster({
		widget_margins: [10, 10],
		widget_base_dimensions: [100, 100],
		max_cols: 12,
		resize:  {
			enabled: true
		}
	});

});