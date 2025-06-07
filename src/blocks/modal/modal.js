import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll';
import { makeModal } from "../../js/libs/makeModal";

(() => {
	const selector = [...document.querySelectorAll('.portfolio__item[data-modal]')]
		.map(item => item.dataset.modal)
		.join(', ');

	if (! selector) return;

	const items = document.querySelectorAll(selector);
	let currentIdx = 0;

	const movePrev = () => {
		if (currentIdx > 0) {
			currentIdx--;
			modal.open(items[currentIdx]);
		}
	};

	const moveNext = () => {
		if (currentIdx < items.length - 1) {
			currentIdx++;
			modal.open(items[currentIdx]);
		}
	};

	const modal = makeModal({
		preserve: true,
		init(underlay) {

		},
		open(modal, source) {
			enablePageScroll();
			disablePageScroll();
			
			modal.buttons();

			if (source.dataset.modal) {
				currentIdx = [...items].findIndex(item => item.id.includes(source.dataset.modal.slice(1)));
			}

			modal.prev.addEventListener('click', movePrev);
			modal.next.addEventListener('click', moveNext);
			this.addEventListener('swiped-right', movePrev);
			this.addEventListener('swiped-left', moveNext);
		},
		close() {
			enablePageScroll();
			currentIdx = 0;
		}
	});

})();