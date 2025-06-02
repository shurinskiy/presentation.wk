import { textareaResize } from "../../js/libs/utils";
import { fieldValidate } from "../../js/libs/fieldValidate";

(() => {
	const form = document.querySelector('form.form');
	if (! form) return;

	const inputs = form.querySelectorAll('.form__input input, .form__input textarea');

	const validate = function(input) {
		const check = fieldValidate(input);
		const field = input.closest('.form__field');
		field.classList.toggle('error', !check.valid);
		field.querySelector('.form__error').innerText = check.message ?? '';
	}

	inputs.forEach(input => {
		(input.tagName === 'TEXTAREA') && textareaResize(input);

		['change', 'blur'].forEach(event => {
			input.addEventListener(event, e => validate(input));
		});
	});

	form.addEventListener('submit', e => {
		e.preventDefault();
		inputs.forEach(input => validate(input));
	});

})();