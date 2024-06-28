

"use strict";

//const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com/"; // Replace with your actual API base URL

const signupForm = document.querySelector(".signup");

signupForm.onsubmit = function (event) {
    event.preventDefault();

    const signupData = {
        username: signupForm.username.value,
        fullName: signupForm.fullname.value,
        password: signupForm.password.value
    }

    signupForm.signupButton.disabled = true;
    
    registerUser(signupData);
}

    const user = {
        username:signupForm.username.value,
    };
    localStorage.setItem('user', JSON.stringify(user));
// This is the start of the javascript for the arrow animation
const modal = document.getElementById("myModal");
        const btn = document.getElementById("openModalBtn");
        const span = document.getElementsByClassName("close")[0];
        const arrowsContainer = document.getElementById("arrowsContainer");

        btn.onclick = function() {
            modal.style.display = "flex";
            generateArrows();
        }

        span.onclick = function() {
            modal.style.display = "none";
            clearArrows();
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                clearArrows();
            }
        }

        function generateArrows() {
            for (let i = 0; i < 17; i++) {
                const arrow = document.createElement('div');
                arrow.className = 'arrow';
                arrow.style.left = getRandomLeft();
                arrow.style.animationDelay = getRandomDelay();
                arrow.style.setProperty('--animation-delay', getRandomDelay());
                arrowsContainer.appendChild(arrow);
            }
        }

        function clearArrows() {
            arrowsContainer.innerHTML = '';
        }

        function getRandomDelay() {
            return Math.random() * 5 + "s";
        }

        function getRandomLeft() {
            return Math.floor(Math.random() * 91) + 5 + "%";
        }