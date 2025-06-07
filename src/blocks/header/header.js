import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll';
import { driveMenu } from "../../js/libs/driveMenu";

(() => {
	const header = document.querySelector('[data-header-js]');
	if (! header) return;

	const navi = header.querySelector('.header__menu');
	const toggles = header.querySelectorAll('.header__toggle, .header__close');
	
	const menu = driveMenu(navi, toggles, {
		omitToClose: '.modal',
		class: 'opened',
		open: function() {
			disablePageScroll();
			document.body.classList.add('underlay');

			this.querySelectorAll('a.header__link[href*="#"]').forEach(link => {
				link.addEventListener('click', (e) => menu.menuClose(e));
			});
		},
		close: function() {
			enablePageScroll();
			document.body.classList.add('underlay_closing');
			
			this.addEventListener('transitionend', e => {
				document.body.classList.remove('underlay', 'underlay_closing');
			}, { once: true });
		}
	});


	window.addEventListener('scroll', () => {
		header.classList[window.scrollY < 30 ? 'remove': 'add']('header_scrolled');
	});

	navi.addEventListener('swiped-left', (e) => menu.menuClose(e));

})();
