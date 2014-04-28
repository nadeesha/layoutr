(function layoutr() {
	'use strict';

	var editorElem = document.getElementById('lr-code-editor-div');
	var editButton = $('<span class="glyphicon glyphicon-edit lr-edit-btn"></span>');
	var codeModal = $('#lr-modal-code');

	var openCodeModal = function(code) {
		window.layoutr.editor.clear();

		codeModal.on('shown.bs.modal', function() {
			window.layoutr.editor.initialize(code);
		});

		codeModal.on('hidden.bs.modal', function() {
			// explicitly unbind all the events.
			codeModal.unbind();
		});

		codeModal.modal();
	};

	window.layoutr = {
		components: {},
		editor: {
			initialize: function(value) {
				return new CodeMirror(editorElem, {
					mode: {
						name: 'HTML'
					},
					theme: 'monokai',
					value: value
				});
			},
			clear: function() {
				editorElem.innerHTML = '';
				console.log(editorElem);
			}
		},
		api: function($elem) {
			var $element = $elem;
			var html;
			var js;


			var prependEditButton = function(elem, callback) {
				var edit = editButton.clone();

				$(edit).click(function() {
					openCodeModal(getCode());
				});

				callback($(elem).prepend(edit));
			};

			var setView = function(view) {
				html = view;
				prependEditButton(view, function(alteredView) {
					$element.append(alteredView);
				});
			};

			var setCode = function(code) {
				js = code;
				setView('<div class="lr-code-box">' + code + '</div>');
			};

			var getCode = function() {
				if (js) {
					return js;
				} else if (html) {
					return html;
				} else {
					return 'No code available for this component';
				}
			};

			return {
				setView: setView,
				setCode: setCode,
				getCode: getCode
			};

		}
	};
})();

function layout() {
	'use strict';

	var insertedComponents = [];

	var addComponent = function(box, component) {
		insertedComponents.push({
			box: box,
			component: component
		});

		var api = new window.layoutr.api(box);

		component.init(api, function() {
			console.debug('init called for');
		});
	};

	return {
		components: insertedComponents,
		addComponent: addComponent
	};
}

$(function initalizePage() {
	'use strict';
	/*jshint camelcase: false */

	(function() {

		var page = new layout();

		var componenetsInsertModal = $('#lr-ui-components');


		var $box = null;

		var plusButton = $('<span class="glyphicon glyphicon-plus lr-manipulate lr-plus-btn"></span>');


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

		// adding gridster reference to the layoutr global
		window.layoutr.gridster = $('.gridster ul').gridster().data('gridster');

		function applyUIComponent(e) {
			if (e.target !== e.currentTarget) {
				return;
			}

			var componentName = e.target.name;

			if (e.target.name && window.layoutr.components.hasOwnProperty(componentName)) {
				var component = new window.layoutr.components[componentName]();

				page.addComponent($box, component);
			}
		}

		function getContentBox($elem) {
			return $($elem.find('.lr-content')[0]);
		}

		function openComponentsModal(e) {
			$box = getContentBox($(e.target.parentElement));
			componenetsInsertModal.modal('show');
		}

		function prependUtilityButtons(elem) {
			var plus = plusButton.clone();

			$(elem).prepend(plus);

		}

		$('#lr-add-box').click(function() {
			window.layoutr.gridster.add_widget('<li class="lr-box">The HTML of the widget...</li>', 2, 1);
		});

		$(document).on('click', '.lr-component-insert-button', applyUIComponent);
		$(document).on('click', '.lr-plus-btn', openComponentsModal);

		$('.lr-box').each(function addPlusButton() {
			prependUtilityButtons(this);
		});


	})();
});