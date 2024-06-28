/* auth.js provides LOGIN-related functions */

"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
// Backup server (mirror):   "https://microbloglite.onrender.com"

// NOTE: API documentation is available at /docs 
// For example: http://microbloglite.us-east-2.elasticbeanstalk.com/docs


// You can use this function to get the login data of the logged-in
// user (if any). It returns either an object including the username
// and token, or an empty object if the visitor is not logged in.
function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}


// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}


// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
function login (loginData) {
    // POST /auth/login
    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    };

    return fetch(apiBaseURL + "/auth/login", options)
    .then(response => response.json())
    .then(loginData => {
        if (loginData.hasOwnProperty("message")) {
            console.error(loginData);
            displayLoginError(loginData.message);
            return null;
        }

            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("/profile.html");  // redirect

            return loginData;
        })
        .catch(error => {
            console.error("Network or server error:", error);
            displayLoginError("Unable to connect.");
        });
}
function displayLoginError(message) {
    const errorElement = document.getElementById("login-error");
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}


//Register User
function registerUser(signupData) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify(signupData),
    };
    

    return fetch(apiBaseURL + "/api/users", options)
        .then(response => response.json())
        .then(registerData => {
            if (registerData.hasOwnProperty("message")) {
                console.error(registerData);
                displayRegistrationError(registerData.message);
                return null;
            }

            console.log("User registered successfully:", registerData);

            window.localStorage.setItem("login-data", JSON.stringify(registerData));
            window.location.assign("../profile.html"); // redirect

            return registerData;
        })
        .catch(error => {
            console.error("Network or server error:", error);
            displayRegistrationError("Unable to connect.");
        });
}
function displayRegistrationError(message) {
    const errorElement = document.getElementById("registration-error");
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}
// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
function logout () {
    const loginData = getLoginData();

    // GET /auth/logout
    const options = { 
        method: "GET",
        headers: { 
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/landing.html");  // redirect back to landing page
        });
}

// Add logout button if user is logged in
document.addEventListener("DOMContentLoaded", function () {
    if (isLoggedIn()) {
        const nav = document.querySelector(".logout");
        const logoutButton = document.createElement("button");
        logoutButton.innerHTML = '<a href="landing.html" id="logoutButton" style="text-decoration:none;" class="color-animation">Logout</a>';
        nav.appendChild(logoutButton);

        document.getElementById("logoutButton").addEventListener("click", function (event) {
            event.preventDefault();
            logout();
        });
    }
});