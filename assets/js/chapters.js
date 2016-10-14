/**
 * Created by jleajones on 07/07/2016.
 */
var chapters = (function () {
	function Chapters ($el) {
		this.$rootEl = $el;
		this.chapters = [$el.find('.chapter')];

		this.bind();
	}

	Chapters.prototype.loadChapter = function () {

	};

	Chapters.prototype.bind = function () {
		this.$rootEl.on('loadChapter', )

	};

	function init ($rootContainer) {
		$rootContainer.data('abt-chapters', new Chapters($rootContainer));
	}

	return {
		init: init
	};
})();

chapters.init($('main'));
