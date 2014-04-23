$(function() {
	'use strict';
	/*jshint camelcase: false */

	(function() {

		(function layoutGridster() {
			$('.gridster ul').gridster({
				widget_margins: [10, 10],
				widget_base_dimensions: [100, 100],
				max_cols: 12,
				resize: {
					enabled: true
				}
			});
		})();

		var gridster = $('.gridster ul').gridster().data('gridster');
		var componentsModal = $('#lr-ui-components');
		var codeModal = $('#lr-ui-code');
		var activeBox;
		var plusButton = $('<span class="glyphicon glyphicon-plus lr-manipulate lr-plus-btn"></span>');
		var editButton = $('<span class="glyphicon glyphicon-edit lr-manipulate lr-edit-btn"></span>');

		function insertComponent(e) {
			if (e.target === e.currentTarget) {
				if (e.target.name === 'tabs') {
					insertTabs();
				}
			}
		}

		function insertTabs() {
			var tabs = $('#lr-html-tabs').clone();
			tabs.attr('id', generateRandomId());
			activeBox.append(tabs);
		}

		function openComponentsModal(e) {
			activeBox = $(e.target.parentElement);
			componentsModal.modal();
		}

		function generateRandomId() {
			return Math.floor(Math.random() * 999999) + 1;
		}

		function openCodeModal(e) {
			activeBox = $(e.target.parentElement);
			var html = activeBox.html();
			$('.summernote').summernote({
				height: 300,
				focus: true
			});
			$('.summernote').code(html);
			codeModal.modal();
		}

		$('#lr-add-box').click(function() {
			gridster.add_widget('<li class="new">The HTML of the widget...</li>', 2, 1);
		});

		$(document).on('click', '.lr-component', insertComponent);
		$(document).on('click', '.lr-plus-btn', openComponentsModal);
		$(document).on('click', '.lr-edit-btn', openCodeModal);

		// add a '+' button to all of the gridster boxes
		$('.lr-box').each(function addPlusButton() {
			var plus = plusButton.clone();
			var edit = editButton.clone();
			$(this).append(plus);
			$(this).append(edit);
		});
	})();
});