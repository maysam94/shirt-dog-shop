"use strict";
/**
 * Zorgt dat de login form zichtbaar wordt als er op geklikt wordt.
 */
function openForm() {
    let loginForm = document.getElementById("login-form");
    if (loginForm != null) {
        loginForm.style.display = "block";
    }
}
/**
 * Zorgt dat de login form weer verdwijnt wanneer er op het kruisje gedrukt wordt.
 */
function closeForm() {
    let loginForm = document.getElementById("login-form");
    if (loginForm != null) {
        loginForm.style.display = "none";
    }
}
