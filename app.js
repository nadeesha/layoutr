window.layoutr = {
	components: {}
};

$(function() {
	'use strict';
	/*jshint camelcase: false */

	(function() {

		var componentsModal = $('#lr-ui-components');
		var codeModal = $('#lr-ui-code');

		var $box = null;

		var plusButton = $('<span class="glyphicon glyphicon-plus lr-manipulate lr-plus-btn"></span>');
		var editButton = $('<span class="glyphicon glyphicon-edit lr-manipulate lr-edit-btn"></span>');

		(function initializeGridster() {
			$('.gridster ul').gridster({
				widget_margins: [10, 10],
				widget_base_dimensions: [100, 100],
				max_cols: 12,
				resize: {
					enabled: true
				}
			});
		})();

		window.layoutr.gridster = $('.gridster ul').gridster().data('gridster');

		function applyUIComponent(e) {
			if (e.target === e.currentTarget) {
				var componentName = e.target.name;

				if (e.target.name && window.layoutr.components.hasOwnProperty(componentName)) {
					var componentToApply = window.layoutr.components[componentName];

					var config = {
						$element: $box
					};

					componentToApply.init(config, function() {
						console.debug('init called for ' + componentName);
					});
				}
			}
		}

		function openComponentsModal(e) {
			$box = $(e.target.parentElement);
			componentsModal.modal('show');
		}

		function openCodeModal(e) {
			$box = $(e.target.parentElement);
			var html = $box.html();
			$('.summernote').summernote({
				height: 300,
				focus: true
			});
			$('.summernote').code(html);
			codeModal.modal();
		}

		function appendUtilityButtons(elem) {
			var plus = plusButton.clone();
			var edit = editButton.clone();
			$(elem).append(plus);
			$(elem).append(edit);
		}

		$('#lr-add-box').click(function() {
			var widget = $('<li class="lr-box">The HTML of the widget...</li>');
			window.layoutr.gridster.add_widget('<li class="lr-box">The HTML of the widget...</li>', 2, 1);
		});

		$(document).on('click', '.lr-component', applyUIComponent);
		$(document).on('click', '.lr-plus-btn', openComponentsModal);
		$(document).on('click', '.lr-edit-btn', openCodeModal);

		$('.lr-box').each(function addPlusButton() {
			appendUtilityButtons(this);
		});


	})();
});