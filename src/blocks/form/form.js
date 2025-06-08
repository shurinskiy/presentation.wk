import { textareaResize } from "../../js/libs/utils";
import { fieldValidate } from "../../js/libs/fieldValidate";

(() => {
	const form = document.querySelector('form.form');
	if (! form) return;

	const TELEGRAM_BOT_TOKEN = '7553527454:AAHhQ77DplMDnVDDp2Xk8pRnZiM688JT1JI';
	const TELEGRAM_CHAT_ID = '@AlexTumanov';
	const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
	const button = form.querySelector('button.form__submit');

	const validate = function(input) {
		const check = fieldValidate(input);
		const field = input.closest('.form__field');
		field.classList.toggle('error', !check.valid);
		field.querySelector('.form__error').innerText = check.message ?? '';

		return check.valid;
	}

	form.querySelectorAll('.form__input input, .form__input textarea').forEach(input => {
		(input.tagName === 'TEXTAREA') && textareaResize(input);

		['change', 'blur'].forEach(event => {
			input.addEventListener(event, e => validate(input));
		});
	});

	form.addEventListener('submit', async function(e) {
		e.preventDefault();
		const formData = Object.fromEntries(new FormData(this));
		let valid = true;
		let text = '';

		this.querySelectorAll('[data-rules]').forEach(input => {
			const check = validate(input);
			valid &&= check;
		});

		if (valid) {
			button.classList.add('pending');

			for (const key in formData) {
				if (key == 'region') continue;
				text += `${key}: ${formData[key]}\n`;
			}

			try {
				const response = await fetch(TELEGRAM_API, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						chat_id: TELEGRAM_CHAT_ID,
						text
					})
				});

				if (response.ok) {
					this.classList.add('success');
					this.reset();
				} else {
					throw new Error(response.statusText);
				}
			} catch (error) {
				console.error(error);
			} finally {
				button.classList.remove('pending');
			}
		}
	});

})();