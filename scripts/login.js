"use strict";

const loginForm = document.querySelector(".login");

loginForm.onsubmit = function (event) {
    event.preventDefault();

    const loginData = {
        username: loginForm.loginUsername.value,
        password: loginForm.loginPassword.value
    }

    loginForm.loginButton.disabled = true;
    
    login(loginData);
}

