"use strict";
class Userlogin {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
class OnlineUser {
    constructor(email, fullname, join_date, role) {
        this.email = email;
        this.fullname = fullname;
        this.join_date = join_date;
        this.role = role;
    }
}
/**
 * na het laden wordt loginMessageSection aangeroepen om de message section toe te voegen
*/
window.addEventListener("load", loginMessageSection);
/**
 * Voegt message sectie toe aan de login form
 */
function loginMessageSection() {
    let loginForm = document.getElementById("login-form");
    let msgSection = createSectionElement("login-msg-section");
    loginForm.appendChild(msgSection);
}
/**
 * Functie om de stying van de login-msg-section te bewerken, en de innertext.
 * @param messageText De innertext van het element
 * @param messageBackground de background styling
 * @param messageBorder de border styling
 * @returns de login-msg-section
 */
function loginMessageStyling(messageText, messageBackground, messageBorder) {
    let msgToUserLogin = document.getElementById("login-msg-section");
    msgToUserLogin.innerText = messageText;
    msgToUserLogin.style.background = messageBackground;
    msgToUserLogin.style.border = messageBorder;
    return msgToUserLogin;
}
/**
 * haalt de input velden op als object, om deze met de Users te kunnen vergelijken
 * @returns de inputvelden als object.
 */
function loginInputData() {
    let loginData = new Userlogin(document.getElementById("email-attempt").value, document.getElementById("password-attempt").value);
    return loginData;
}
/**
 * kijkt naar meerdere functies om te kijken of loginComplete() kan worden aangeroepen.
 */
function loginProcess() {
    let userLogin = loginInputData();
    // als er een userlist is, input, en de input matcht met data in de storage, loginComplete();
    if (checkInputValues(userLogin)) {
        getUserFromDB(userLogin);
    }
}
/**
 * kijkt of er input values zijn.
 * @param userLogin de values van de inputvelden
 * @returns false als de lengte van één van de velden 0 is, true als ze beiden zijn ingevuld.
 */
function checkInputValues(userLogin) {
    if (userLogin.email.length == 0 || userLogin.password.length == 0) {
        loginMessageStyling("You forgot some input.", "#ebaaaa", "#f87a7a 1px solid");
        return false;
    }
    else {
        return true;
    }
}
/**
 * haalt de email en fullname op indien de email en wachtwoord overeen komen met die van een gebruiker in de database.
 */
function getUserFromDB(loginData) {
    const myRequest = new Request("http://127.0.0.1:4001/get_user_sds", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
        }),
    });
    fetch(myRequest)
        .then((response) => {
        response.json().then((data) => loginCheck(data));
    })
        .catch(console.error);
}
/**
 * Handelt een succesvolle en onsucesvolle loginpoging af.
 */
function loginCheck(data) {
    if (data.length == 1) {
        loginMessageStyling("You've logged in succesfully! You will be redirected to the store in a few seconds.", "#b8dcf3", "#a7c3fa 1px solid");
        let loggedInUserData = createOnlineUser(data[0]);
        // voegt gebruiker toe aan sessionStorage. Zo kun je controleren of iemand ingelogd is en bepaalde functies toestaan.
        sessionStorage.setItem("active-user", JSON.stringify({ email: loggedInUserData.email, fullname: loggedInUserData.fullname, join_date: loggedInUserData.join_date.toLocaleString(), role: loggedInUserData.role }));
        setTimeout(goPage, 2500);
    }
    else {
        loginMessageStyling("Wrong credentials", "#ebaaaa", "#f87a7a 1px solid");
    }
}
/**
 * Maakt een OnlineUser object aan
 * @param userData gebruikers data uit de database
 * @returns een OnlineUser object
 */
function createOnlineUser(userData) {
    let onlineUser = new OnlineUser(userData.email, userData.fullname, new Date(userData.join_date), userData.role);
    return onlineUser;
}
/**
 * gaat naar de homepage toe.
 */
function goPage() {
    window.location.href = "/views/index.html";
}
/**
 * maakt een nieuwe section tag waarbij je id kunt doorgeven in de parameter
 * @param sectionId id van de sectie
 * @returns {HTMLElement}
 */
function createSectionElement(sectionId) {
    let newSection = document.createElement("section");
    newSection.id = sectionId;
    return newSection;
}
