var registerBlockType = wp.blocks.registerBlockType;
var createElement = wp.element.createElement;

registerBlockType('blocks-course/firstblock', {
	edit: function () {
		return createElement('p', { className: 'bouh' }, 'patate');
	},
	save: function () {
		return createElement('p', null, 'navet');
	},
});
