class User {
  constructor(
    public email: string,
    public fullname: string,
    public password: string
  ) { }
}

window.addEventListener("load", addMessageSection);
/**
 * voegt nieuwe sectie toe aan de registratie sectie om messages in te zetten.
 * @returns {HTMLElement}
 */
function addMessageSection(): void {
  let registerSection: HTMLElement = document.getElementById(
    "register-section"
  ) as HTMLElement;
  let msgSection: HTMLElement = createSection("msg-section") as HTMLElement;
  registerSection.appendChild(msgSection);
}

/**
 * Bepaald de style van de message sectie, door aan de parameters waardes toe te voegen.
 * @param messageText De innertext van de sectie.
 * @param messageBackground  De achtergrondkleur.
 * @param messageBorder De border om de sectie heen.
 * @returns {HTMLElement} De sectie.
 */
function registerMessageStyling(
  messageText: string,
  messageBackground: string,
  messageBorder: string
): HTMLElement | undefined {
  let msgToUser: HTMLElement = document.getElementById("msg-section") as HTMLElement;
  msgToUser.innerText = messageText;
  msgToUser.style.background = messageBackground;
  msgToUser.style.border = messageBorder;
  return msgToUser;
}

/**
 * Haalt de input in de velden op.
 * @returns {User} userInput
 */
function getRegistrationInput(): User {
  let userInput = new User(
    (document.getElementById("email-registration") as HTMLInputElement).value,
    (document.getElementById("name-registration") as HTMLInputElement).value,
    (document.getElementById("password-registration") as HTMLInputElement).value
  );
  return userInput;
}

/**
 * Controleert door het gebruik van meerdere functies of de functie die een account registreert aangeroepen mag worden.
 */
function registrationProcess(): void {
  let registrationInput = getRegistrationInput();
  if (
    everyFieldHasInput(registrationInput) &&
    ValidateEmail() &&
    checkPasswordInput() &&
    checkPasswordsMatch()
  ) {
    // als alle eisen voldoen wordt een gebruiker registreert 
    registerUserToDB(registrationInput);
    // anders wordt er een foutmelding weergegeven met wat er fout is.
  } else if (!everyFieldHasInput(registrationInput)) {
    registerMessageStyling(
      "You forgot some input",
      "#ebaaaa",
      "#f87a7a 1px solid"
    );
  } else if (!checkPasswordInput()) {
    registerMessageStyling("Invalid password", "#ebaaaa", "#f87a7a 1px solid");
  } else if (!checkPasswordsMatch()) {
    registerMessageStyling(
      "Passwords don't match",
      "#ebaaaa",
      "#f87a7a 1px solid"
    );
  }
}

/**
 * Kijkt of elk veld input heeft
 * @param registrationInput een instantie van de class User
 * @returns false als er input mist, anders true.
 */
function everyFieldHasInput(registrationInput: User): boolean {
  if (
    registrationInput.email.length == 0 ||
    registrationInput.fullname.length == 0 ||
    registrationInput.password.length == 0
  ) {
    return false;
  } else {
    return true;
  }
}

/**
 * Kijkt of het mailadres geldig is.
 * @returns True als er een match is tussen de RegExp en de input. anders false.
 */
function ValidateEmail(): boolean {
  var mailformat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let inputText = (
    document.getElementById("email-registration") as HTMLInputElement
  ).value;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    registerMessageStyling("Invalid e-mail", "#ebaaaa", "#f87a7a 1px solid");
    return false;
  }
}
/**
 * Kijk of de password geldig is.
 * @returns True als er een match is tussen de RegExp, anders false.
 */
function checkPasswordInput(): boolean {
  let passwRegex: RegExp = new RegExp(
    "(?=.*?[#?!@$%^&*-])(?=.*?[0-9])(.{8,})+$"
  );
  let passwordInput = (
    document.getElementById("password-registration") as HTMLInputElement
  ).value;
  let passwordValidationMsg: HTMLElement = document.getElementById(
    "password-validation-msg"
  ) as HTMLElement;
  if (passwordInput.match(passwRegex) && passwordInput.length <= 62) {
    passwordValidationMsg.style.color = "green";
    return true;
  } else {
    passwordValidationMsg.style.color = "red";
    return false;
  }
}

/**
 * Kijkt of het de password-validatie input gelijk is aan de password-input.
 * @returns True als het gelijk is. Anders false.
 */
function checkPasswordsMatch(): boolean {
  let passwordDoubleCheck = (
    document.getElementById("password-check") as HTMLInputElement
  ).value;
  if (
    passwordDoubleCheck ==
    (document.getElementById("password-registration") as HTMLInputElement).value
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Registreert een account door hem in de database op te slaan.
 * @param user een instantie van de class User.
 */
function registerUserToDB(user: User): void {
  const myRequest = new Request("http://127.0.0.1:4001/register_user_sds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      fullname: user.fullname,
      password: user.password,
    }),
  });
  fetch(myRequest)
    .then((response) => {
      {
        response.json();
      }
      console.log(response);
      if (response.ok === true) {
        // als de response OK is komt er een melding van succes
        registerMessageStyling(
          "Registration succesful!",
          "#afdda8",
          "93c08c 1px solid"
        );
      } else {
        // als de response niet OK is, wordt er weergegeven wat er mis is gegaan.
        registerMessageStyling(
          response.statusText,
          "#ebaaaa",
          "#f87a7a 1px solid"
        );
      }
    })
    .catch(console.error);
}

/**
 * maakt een nieuwe section tag waarbij je id kunt meegeven in de parameter
 * @param sectionId id van de sectie
 * @returns {HTMLElement}
 */
function createSection(sectionId: string): HTMLElement {
  let newSection: HTMLElement = document.createElement(
    "section"
  ) as HTMLElement;
  newSection.id = sectionId;
  return newSection;
}
