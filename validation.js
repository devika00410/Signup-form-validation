document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('input[placeholder="Enter username"]');
    const emailInput = document.querySelector('input[placeholder="johndoe@example.com"]');
    const passwordInput = document.querySelector('input[placeholder="Enter valid password"]');
    const confirmPasswordInput = document.querySelector('input[placeholder="Confirm password"]');
    const termsCheckbox = document.getElementById('terms');
    const submitButton = document.getElementById('submit');
    const successMessage = document.getElementById('success-message');

    // Error message
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-id-error'); // Fixed ID to match HTML
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirmpassword-error');
    const termsError = document.getElementById('not agreed');

    // Regex 
    const nameRegex = /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Event listeners for validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', function() {
        validatePassword();
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    termsCheckbox.addEventListener('change', validateTerms);

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsValid = validateTerms();

        // Sucess message
if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'inline-block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);

        form.reset();
    }
    });

//    Capitalizing the username
    usernameInput.addEventListener('input', function(e) {
        const value = e.target.value;
        if (value.length === 1) {
            e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        validateUsername(); 
    });

    // Validation functions
    // 1.Username
    function validateUsername() {
        const value = usernameInput.value.trim();
        if (!value) {
            usernameError.textContent = 'Username is required';
            usernameInput.classList.add('is-invalid');
            return false;
        } else if (/[0-9]/.test(value)) {
            usernameError.textContent = 'Username cannot contain numbers';
            usernameInput.classList.add('is-invalid');
            return false;
        } else if (!nameRegex.test(value)) {
            usernameError.textContent = 'Invalid username (only letters, spaces, hyphens, apostrophes allowed)';
            usernameInput.classList.add('is-invalid');
            return false;
        } else {
            usernameError.textContent = '';
            usernameInput.classList.remove('is-invalid');
            return true;
        }
    }
// 2.Email
    function validateEmail() {
        const value = emailInput.value.trim();
        if (!value) {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('is-invalid');
            return false;
        } else if (!emailRegex.test(value)) {
            emailError.textContent = 'Invalid email format (e.g., user@example.com)';
            emailInput.classList.add('is-invalid');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('is-invalid');
            return true;
        }
    }
// 3.Password
    function validatePassword() {
        const value = passwordInput.value;
        if (!value) {
            passwordError.textContent = 'Password is required';
            return false;
        } else if (!passwordRegex.test(value)) {
            passwordError.textContent = 'Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }
// 4.Confirm password
    function validateConfirmPassword() {
        const value = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;
        
        if (!value) {
            confirmPasswordError.textContent = 'Please confirm your password';
            return false;
        } else if (value !== passwordValue) {
            confirmPasswordError.textContent = 'Passwords do not match';
            return false;
        } else {
            confirmPasswordError.textContent = '';
            return true;
        }
    }
// 5.Terms and conditions
    function validateTerms() {
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the terms and conditions';
            return false;
        } else {
            termsError.textContent = '';
            return true;
        }
    }
});