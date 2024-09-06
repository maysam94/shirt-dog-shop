/**
 * Zorgt dat de login form zichtbaar wordt als er op geklikt wordt.
 */
function openForm(): void {
  let loginForm: HTMLElement | null = document.getElementById("login-form");
  if (loginForm != null) {
    loginForm.style.display = "block";
  }
}
/**
 * Zorgt dat de login form weer verdwijnt wanneer er op het kruisje gedrukt wordt.
 */
function closeForm(): void {
  let loginForm: HTMLElement | null = document.getElementById("login-form");
  if (loginForm != null) {
    loginForm.style.display = "none";
  }
}