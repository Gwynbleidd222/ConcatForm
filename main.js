const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const radio1 = document.querySelector('#radio-1')
const radio2 = document.querySelector('#radio-2')
const message = document.querySelector('#msg')
const checkBox = document.querySelector('#consent')
const success = document.querySelector('.msg-status')
const sendBtn = document.querySelector('.btn')

const showError = (input, msg) => {
	let errorMsg =
		input.parentElement.querySelector('.message-error') ||
		input.parentElement.querySelector('.email-msg-error') ||
		input.parentElement.querySelector('.query-error-msg')

	if (errorMsg) {
		errorMsg.innerText = msg
	}

	input.classList.add('error')
	input.classList.remove('success')
}

const setSuccess = input => {
	let errorMsg =
		input.parentElement.querySelector('.message-error') ||
		input.parentElement.querySelector('.email-msg-error') ||
		input.parentElement.querySelector('.query-error-msg')

	if (errorMsg) errorMsg.innerText = ''
	input.classList.add('success')
	input.classList.remove('error')
}

const isValidEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
	return re.test(String(email).toLowerCase())
}

const checkInputs = () => {
	const firstNameValue = firstName.value.trim()
	const lastNameValue = lastName.value.trim()
	const emailValue = email.value.trim()
	const messageValue = message.value.trim()
	const isRadioSelected = radio1.checked || radio2.checked;
	const isCheckboxChecked = checkBox.checked;
	let isValid = true

	if (firstNameValue === '') {
		showError(firstName, 'This field is required')
		isValid = false
	} else {
		setSuccess(firstName)
	}

	if (lastNameValue === '') {
		showError(lastName, 'This field is required')
		isValid = false
	} else {
		setSuccess(lastName)
	}

	if (emailValue === '') {
		showError(email, 'Email is required')
		isValid = false
	} else if (!isValidEmail(emailValue)) {
		showError(email, 'Please enter a valid email address')
		isValid = false
	} else {
		setSuccess(email)
	}

	if (!isRadioSelected) {
		const queryErrorMsg = document.querySelector('.query-error-msg');
		if (queryErrorMsg) {
			queryErrorMsg.innerText = 'Please select an enquiry type';
            isValid = false

		}
	} else {
		const queryErrorMsg = document.querySelector('.query-error-msg');
		if (queryErrorMsg) {
			queryErrorMsg.innerText = '';
		}
	}

	if (messageValue === '') {
		showError(message, 'Message is required')
		isValid = false
	} else {
		setSuccess(message)
	}

	if (!isCheckboxChecked) {
		const consentErrorMsg = document.querySelector('.message-error-check');
		if (consentErrorMsg) {
			consentErrorMsg.innerText = 'You must consent to be contacted';
            isValid = false
		}
	} else {
		const consentErrorMsg = document.querySelector('.message-error-check');
		if (consentErrorMsg) {
			consentErrorMsg.innerText = '';
		}
	}

	if (isValid) {
		success.style.display = 'block'
		setTimeout(() => {
			success.style.display = 'none'
		}, 3000)
	}
}

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkInputs()
})
