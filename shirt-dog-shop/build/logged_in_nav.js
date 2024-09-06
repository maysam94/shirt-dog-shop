"use strict";
window.addEventListener("load", changeNavBar);
/**
 * Kijkt of de functie checkActiveUser true geeft. Zo ja worden twee functies aangeroepen.
 */
function changeNavBar() {
    if (checkActiveUser()) {
        removeLoginAndJoinFromNav();
        addLogoutButton();
    }
}
/**
 * Kijkt of active-user in de sessionStorage staat.
 * @returns True als hij erin straat, anders false.
 */
function checkActiveUser() {
    if (sessionStorage.getItem("active-user")) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Verandert de display style van de login link en join link naar "none".
 */
function removeLoginAndJoinFromNav() {
    let loginButton = document.getElementById("login-nav");
    loginButton.style.display = "none";
    let joinNav = document.getElementById("join-nav");
    joinNav.style.display = "none";
}
/**
 * Voegt een nieuwe logout button toe aan de navbar en een button die je naar je userpage zou moeten verwijzen.
 */
function addLogoutButton() {
    let navBar = document.getElementById("nav-bar");
    let userButton = createButton("user-nav", "Hello " + (JSON.parse(sessionStorage.getItem("active-user"))).fullname);
    navBar.appendChild(userButton);
    let logoutButton = createButton("logout-nav", "LOGOUT");
    logoutButton.addEventListener("click", logout);
    navBar.appendChild(logoutButton);
}
/**
 * functie om de gebruiker "uit te loggen", door de gebruiker uit de sessionStorage te halen.
 */
function logout() {
    sessionStorage.removeItem("active-user");
    let navBar = document.getElementById("nav-bar");
    let logoutButton = document.getElementById("logout-nav");
    navBar.removeChild(logoutButton);
    window.location.href = "/views/index.html";
}
/**
 * Functie om een nieuwe button met id en text te maken.
 * @param buttonId een string als ID
 * @param buttonText een string als innerText
 * @returns { HTMLButtonElement } een nieuwe button
 */
function createButton(buttonId, buttonText) {
    let newButton = document.createElement("button");
    newButton.id = buttonId;
    newButton.innerText = buttonText;
    return newButton;
}
