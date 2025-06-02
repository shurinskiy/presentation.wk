(() => {
	const header = document.querySelector('[data-header-js]');
	if (! header) return;

	window.addEventListener('scroll', () => {
		header.classList[window.scrollY < 30 ? 'remove': 'add']('header_scrolled');
	});

})();
