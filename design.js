(function layoutr() {
	'use strict';

	var editorElem = document.getElementById('lr-code-editor-div');

	var editor;

	window.layoutr = {
		components: {},
		editor: {
			initialize: function(value) {
				if (editor) {
					editor.doc.setValue(value);
				} else {
					editor = new CodeMirror(editorElem, {
						mode: {
							name: 'HTML'
						},
						theme: 'monokai',
						value: value
					});
				}

				return editor;
			},
			getContent: function() {
				return editor.doc.getValue();
			}
		}
	};
})();

$(function initalizePage() {
	/*jshint camelcase: false */
	'use strict';

	(function setupFunctionality() {

		var componenetsInsertModal = $('#lr-ui-components');

		var insertedComponents = [];

		var $box = null;

		var plusButton = $('<span class="glyphicon glyphicon-plus lr-manipulate lr-plus-btn"></span>');

		var codeModal = $('#lr-modal-code');

		var activeComponentInstance;

		var openCodeModal = function(e) {
			activeComponentInstance = _.find(insertedComponents, function(cmp) {
				return cmp.containerId === e.target.attributes.getNamedItem('data-lr-edit-for').value;
			}).componentInstance;

			codeModal.on('shown.bs.modal', function() {
				window.layoutr.editor.initialize(activeComponentInstance.get());
			});

			codeModal.on('hidden.bs.modal', function() {
				// explicitly unbind all the events.
				codeModal.unbind();
				// unload the active instance
				activeComponentInstance = null;
			});

			codeModal.modal();
		};


		(function initializeGridster() {
			$('.gridster ul').gridster({
				widget_margins: [10, 10],
				widget_base_dimensions: [100, 100],
				max_cols: 12,
				resize: {
					enabled: true
				},
				serialize_params: function($w, wgd) {
					var componentIds = [];
					var code = '';

					$w.find('.lr-content').children().each(function(idx, elem) {
						componentIds.push($(elem).attr('id'));

						var component = _.find(insertedComponents, function(cmp) {
							return cmp.containerId === $(elem).attr('id');
						});

						code += component.componentInstance.get();
					});

					var id = parseInt(Math.random() * 100000);

					return {
						id: id,
						componentIds: componentIds,
						code: code,
						col: wgd.col,
						row: wgd.row,
						size_x: wgd.size_x,
						size_y: wgd.size_y
					};
				}
			});
		})();

		// adding gridster reference to the layoutr global
		window.layoutr.gridster = $('.gridster ul').gridster().data('gridster');

		/**
		 *
		 * this function is responsible for inserting UI componenets to the design view
		 * it will create a container div with a unique-ish id inside the clicked
		 * gridster box and call the init function of the component on it
		 *
		 **/

		function applyUIComponent(e) {
			if (e.target !== e.currentTarget) {
				return;
			}

			insertUIComponent(e.target.name);
		}

		function insertUIComponent(componentName, data) {
			if (window.layoutr.components.hasOwnProperty(componentName)) {
				var $container = $('<div class="lr-component-container"></div>');
				$container.attr('id', 'data-lr-' + parseInt(Math.random() * 100000));

				var componentInstance = new window.layoutr.components[componentName]($container);

				insertedComponents.push({
					$gridsterBox: $box,
					containerId: $container.attr('id'),
					componentInstance: componentInstance,
					name: componentName
				});

				componentInstance.init(data, function() {
					$box.append($container);
				});
			}
		}

		function getContentBox($elem) {
			return $($elem.find('.lr-content').get(0));
		}

		function openComponentsModal(e) {
			$box = getContentBox($(e.target.parentElement));
			componenetsInsertModal.modal('show');
		}

		function prependUtilityButtonsForBox(elem) {
			var plus = plusButton.clone();
			$(elem).prepend(plus);
		}

		function saveLayout() {
			serialize();
		}

		$('#lr-add-box').click(function() {
			window.layoutr.gridster.add_widget('<li class="lr-box">The HTML of the widget...</li>', 2, 1);
		});


		$('#lr-save-code').click(function() {
			activeComponentInstance.set(window.layoutr.editor.getContent());
		});

		$(document).on('click', '.lr-component-insert-button', applyUIComponent);
		$(document).on('click', '.lr-plus-btn', openComponentsModal);
		$(document).on('click', '.lr-edit-btn', openCodeModal);
		$(document).on('click', '.lr-save-btn', saveLayout);

		function serialize() {
			var gridsterLayout = window.layoutr.gridster.serialize();

			var components = [];

			insertedComponents.forEach(function(component) {
				components.push({
					componentId: component.containerId,
					name: component.name,
					data: component.componentInstance.get()
				});
			});

			var page = {
				gridsterLayout: gridsterLayout,
				components: components
			};

			localStorage.setItem('page', JSON.stringify(page));
		}

		(function loadLayout() {
			if (localStorage.getItem('page')) {
				var page = JSON.parse(localStorage.getItem('page'));

				window.layoutr.gridster.remove_all_widgets();

				page.gridsterLayout.forEach(function(gridsterBox) {
					var $widget = $('<li class="lr-box"><div class="lr-content"></div></li>');
					$box = getContentBox($widget);

					gridsterBox.componentIds.forEach(function(id) {
						var component = _.find(page.components, function(cmp) {
							return cmp.componentId === id;
						});

						insertUIComponent(component.name, component.data);
					});

					prependUtilityButtonsForBox($widget.get(0));

					window.layoutr.gridster.add_widget($widget.get(0), gridsterBox.size_x, gridsterBox.size_y, gridsterBox.col, gridsterBox.row);
				});
			}
		})();
	})();
});