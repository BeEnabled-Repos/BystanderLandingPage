(() => {
    'use strict';

    const form = document.getElementById('waitlist-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_REGEX = /^[\d\s()\-+.]+$/;

    function showError(input, errorEl, message) {
        errorEl.textContent = '⚠ ' + message;
        input.setAttribute('aria-invalid', 'true');
    }

    function clearError(input, errorEl) {
        errorEl.textContent = '';
        input.removeAttribute('aria-invalid');
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (!value) {
            showError(emailInput, emailError, 'Please enter your email address.');
            return false;
        }
        if (!EMAIL_REGEX.test(value)) {
            showError(emailInput, emailError, 'Please enter a valid email address, like name@example.com.');
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    }

    function validatePhone() {
        const value = phoneInput.value.trim();
        if (value && !PHONE_REGEX.test(value)) {
            return false;
        }
        return true;
    }

    // Clear errors on input
    emailInput.addEventListener('input', () => {
        if (emailInput.getAttribute('aria-invalid') === 'true') {
            validateEmail();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();

        if (!isEmailValid) {
            emailInput.focus();
            return;
        }

        if (!isPhoneValid) {
            phoneInput.focus();
            return;
        }

        // Log the submission (no backend)
        const data = {
            name: nameInput.value.trim() || null,
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim() || null,
        };
        console.log('Waitlist signup:', data);

        // Show success state
        form.hidden = true;
        document.querySelector('.form-intro').hidden = true;
        document.querySelector('.required-notice').hidden = true;
        successMessage.hidden = false;
        successMessage.focus();
    });
})();
