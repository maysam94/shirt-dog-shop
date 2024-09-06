window.addEventListener("load", changeNavBar);

/**
 * Kijkt of de functie checkActiveUser true geeft. Zo ja worden twee functies aangeroepen.
 */
function changeNavBar(): void {
  if (checkActiveUser()) {
    removeLoginAndJoinFromNav();
    addLogoutButton();
  }
}

/**
 * Kijkt of active-user in de sessionStorage staat. 
 * @returns True als hij erin straat, anders false.
 */
function checkActiveUser(): boolean {
  if (sessionStorage.getItem("active-user")) {
    return true;
  } else {
    return false;
  }
}

/**
 * Verandert de display style van de login link en join link naar "none".
 */
function removeLoginAndJoinFromNav(): void {
  let loginButton: HTMLButtonElement = document.getElementById("login-nav") as HTMLButtonElement;
  loginButton.style.display = "none";
  let joinNav: HTMLAnchorElement = document.getElementById("join-nav") as HTMLAnchorElement;
  joinNav.style.display = "none";
}

/**
 * Voegt een nieuwe logout button toe aan de navbar en een button die je naar je userpage zou moeten verwijzen.
 */
function addLogoutButton(): void {
  let navBar: HTMLElement = document.getElementById("nav-bar") as HTMLElement;
  let userButton: HTMLButtonElement = createButton("user-nav", "Hello " + (JSON.parse(sessionStorage.getItem("active-user") as string)).fullname)
  navBar.appendChild(userButton);
  let logoutButton: HTMLButtonElement = createButton("logout-nav", "LOGOUT") as HTMLButtonElement;
  logoutButton.addEventListener("click", logout)
  navBar.appendChild(logoutButton);
}

/**
 * functie om de gebruiker "uit te loggen", door de gebruiker uit de sessionStorage te halen.
 */
function logout(): void {
  sessionStorage.removeItem("active-user");
  let navBar: HTMLElement = document.getElementById("nav-bar") as HTMLElement;
  let logoutButton: HTMLButtonElement = document.getElementById("logout-nav") as HTMLButtonElement;
  navBar.removeChild(logoutButton);
  window.location.href = "/views/index.html";
}

/**
 * Functie om een nieuwe button met id en text te maken.
 * @param buttonId een string als ID
 * @param buttonText een string als innerText
 * @returns { HTMLButtonElement } een nieuwe button
 */

function createButton(buttonId: string, buttonText: string): HTMLButtonElement {
  let newButton: HTMLButtonElement = document.createElement("button");
  newButton.id = buttonId;
  newButton.innerText = buttonText;
  return newButton;
}