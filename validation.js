document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('form');
    const usernameInput = document.getElementById('nameInput');
    const mobileInput = document.getElementById('mobileInput');
    const dobInput = document.getElementById('dobInput');
    const emailInput = document.getElementById('emailInput');
    const addressInput = document.getElementById('addressInput');
    const cityInput = document.getElementById('cityInput');
    const stateSelect = document.querySelector('.form-select');
    const pincodeInput = document.getElementById('pincodeInput');
    const panInput = document.getElementById('panInput');
    const aadharInput = document.getElementById('aadharInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmpasswordInput');
    const termsCheckbox = document.getElementById('terms');
    const submitButton = document.getElementById('submit');
    const successMessage = document.getElementById('success-message');

    // Error messages
    const usernameError = document.getElementById('username-error');
    const mobileError = document.getElementById('mobile-error');
    const dobError = document.getElementById('dob-error');
    const emailError = document.getElementById('email-id-error');
    const addressError = document.getElementById('address-error');
    const cityError = document.getElementById('city-error');
    const pincodeError = document.getElementById('pincode-error');
    const panError = document.getElementById('pan-error');
    const aadharError = document.getElementById('aadhar-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirmpassword-error');
    const termsError = document.getElementById('not agreed');

    // Real-time validation for other fields
    mobileInput.addEventListener('input', validateMobile);
    dobInput.addEventListener('input', validateDOB);
    emailInput.addEventListener('input', validateEmail);
    addressInput.addEventListener('input', validateAddress);
    cityInput.addEventListener('input', validateCity);
    pincodeInput.addEventListener('input', validatePincode);
    panInput.addEventListener('input', validatePAN);
    passwordInput.addEventListener('input', function() {
        validatePassword();
        if (confirmPasswordInput.value) validateConfirmPassword();
    });
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    termsCheckbox.addEventListener('change', validateTerms);

    // Form submission handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isValid = 
            validateUsername() &&
            validateMobile() &&
            validateDOB() &&
            validateEmail() &&
            validateAddress() &&
            validateCity() &&
            validatePincode() &&
            validatePAN() &&
            validateAadhar() &&
            validatePassword() &&
            validateConfirmPassword() &&
            validateTerms();
            
    //    success message
        if (isValid) {
            successMessage.style.display = 'block';
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none';
            }, 7000);
        }
    });


     // Capitalize first letter of username
    usernameInput.addEventListener('input', function(e) {
        const value = e.target.value;
        if (value.length === 1) {
            e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        validateUsername();
    });


    // Aadhaar input formatting
    aadharInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value.trim().slice(0, 14);
        validateAadhar();
    });

    // Field validation functions
    // 1.username
    function validateUsername() {
        const value = usernameInput.value.trim();
        if (!value) {
            showError(usernameInput, usernameError, 'Username is required');
            return false;
        } else if (!/^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/.test(value)) {
            showError(usernameInput, usernameError, 'Only letters and spaces allowed');
            return false;
        } else {
            clearError(usernameInput, usernameError);
            return true;
        }
    }
// 2.mobilenumber
    function validateMobile() {
        const value = mobileInput.value.trim();
        if (!value) {
            showError(mobileInput, mobileError, 'Mobile number is required');
            return false;
        } else if (!/^[6-9]\d{9}$/.test(value)) {
            showError(mobileInput, mobileError, 'Invalid Indian mobile number');
            return false;
        } else {
            clearError(mobileInput, mobileError);
            return true;
        }
    }
//3. D.O.B
    function validateDOB() {
        const value = dobInput.value.trim();
        if (!value) {
            showError(dobInput, dobError, 'Date of birth is required');
            return false;
        }
        
        // Validate date format DD/MM/YYYY
        if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(value)) {
            showError(dobInput, dobError, 'Format: DD/MM/YYYY');
            return false;
        }
        
        // Calculate exact age and check whether age is above 18
        const parts = value.split('/');
        const dobDate = new Date(parts[2], parts[1]-1, parts[0]);
        const today = new Date();
        
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        
        if (age < 18) {
            showError(dobInput, dobError, 'You must be at least 18 years old');
            return false;
        }
        
        clearError(dobInput, dobError);
        return true;
    }
    // 4. Email

    function validateEmail() {
        const value = emailInput.value.trim();
        if (!value) {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            showError(emailInput, emailError, 'Invalid email format');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    }
// 5.Address
    function validateAddress() {
        const value = addressInput.value.trim();
        if (!value) {
            showError(addressInput, addressError, 'Address is required');
            return false;
        } else if (value.length < 10) {
            showError(addressInput, addressError, 'Address too short (min 10 chars)');
            return false;
        } else {
            clearError(addressInput, addressError);
            return true;
        }
    }
// 6.City
    function validateCity() {
        const value = cityInput.value.trim();
        if (!value) {
            showError(cityInput, cityError, 'City is required');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            showError(cityInput, cityError, 'Only letters allowed');
            return false;
        } else {
            clearError(cityInput, cityError);
            return true;
        }
    }
// 7.Pincode
    function validatePincode() {
        const value = pincodeInput.value.trim();
        if (!value) {
            showError(pincodeInput, pincodeError, 'Pincode is required');
            return false;
        } else if (!/^\d{6}$/.test(value)) {
            showError(pincodeInput, pincodeError, 'Must be 6 digits');
            return false;
        } else {
            clearError(pincodeInput, pincodeError);
            return true;
        }
    }
// 8. pan card
    function validatePAN() {
        const value = panInput.value.trim();
        if (!value) {
            showError(panInput, panError, 'PAN is required');
            return false;
        } else if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(value)) {
            showError(panInput, panError, 'Format: ABCDE1234F');
            return false;
        } else {
            clearError(panInput, panError);
            return true;
        }
    }
// 9. Aadhar card
   function validateAadhar() {
    const value = aadharInput.value;
    const numericValue = value.replace(/\D/g, '');
    if (!value) {
        showError(aadharInput, aadharError, 'Aadhaar is required');
        return false;
    } else if (numericValue.length !== 12) {
        showError(aadharInput, aadharError, 'Must be 12 digits');
        return false;
    } else if (!/^[2-9]/.test(numericValue)) {
        showError(aadharInput, aadharError, 'Must start with digit 2-9');
        return false;
    } else if (/^(\d)\1{11}$/.test(numericValue)) {
        showError(aadharInput, aadharError, 'All digits cannot be same');
        return false;
    } else {
        clearError(aadharInput, aadharError);
        return true;
    }
}
// 10. Password
    function validatePassword() {
        const value = passwordInput.value;
        if (!value) {
            showError(passwordInput, passwordError, 'Password is required');
            return false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
            showError(passwordInput, passwordError, 'Does not meet requirements');
            return false;
        } else {
            clearError(passwordInput, passwordError);
            return true;
        }
    }
// 11. Confirmpassword
    function validateConfirmPassword() {
        const value = confirmPasswordInput.value;
        if (!value) {
            showError(confirmPasswordInput, confirmPasswordError, 'Please confirm password');
            return false;
        } else if (value !== passwordInput.value) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
            return false;
        } else {
            clearError(confirmPasswordInput, confirmPasswordError);
            return true;
        }
    }

    function validateTerms() {
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the terms';
            return false;
        } else {
            termsError.textContent = '';
            return true;
        }
    }

    // Helper functions
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }

    function clearError(input, errorElement) {
        errorElement.textContent = '';
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }

    
});