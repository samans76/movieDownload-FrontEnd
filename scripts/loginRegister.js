import { pageConstructor } from "./pageHandling.js";
import { users } from "../resources/localDatabase.js";

const loginUsernameInput = document.querySelector(
  "#loginFormBox > div.usernameSpot > input"
);
const loginPasswordInput = document.querySelector(
  "#loginFormBox > div.passwordSpot > input"
);
const loginSubmitButton = document.querySelector("#loginFormBox .loginButton");

const registerUsernameInput = document.querySelector(
  "#registerFormBox > div.usernameSpot > input"
);
const registerEmailInput = document.querySelector(
  "#registerFormBox > div.emailSpot > input"
);
const registerPasswordInput = document.querySelector(
  "#registerFormBox > div.passwordSpot > input"
);
const registerPasswordConfirmInput = document.querySelector(
  "#registerFormBox > div.confirmPasswordSpot > input"
);
const registerSubmitButton = document.querySelector(
  "#registerFormBox .registerButton"
);
const loginButton = document.querySelector("#loginBox");
const loginFormBox = document.querySelector("#loginFormBox");
const registerFormBox = document.querySelector("#registerFormBox");
const loginTitleButton = document.querySelector(
  "#registerFormBox .loginHeaderButton"
);
const registerTitleButton = document.querySelector(
  "#loginFormBox .registerHeaderButton"
);
const profilePhoto = document.querySelector(
  "#loginContainer #profilePhoto img"
);
const profileForm = document.querySelector("#loginContainer #profileFormBox");
const profileFormAdminButton = document.querySelector(
  "#loginContainer #profileFormBox .adminPageButton"
);
const profileFormLogOutButton = document.querySelector(
  "#loginContainer #profileFormBox .logOutButton"
);

export function loginRegisterClickEvents(state) {
  [loginButton, loginTitleButton].forEach((button) => {
    button.addEventListener("click", () => {
      showLoginForm();
    });
  });
  registerTitleButton.addEventListener("click", () => {
    showRegisterForm();
  });

  loginSubmitButton.addEventListener("click", () => {
    loginUser(state, loginUsernameInput.value, loginPasswordInput.value);
    loginUsernameInput.value = "";
    loginPasswordInput.value = "";
  });
  registerSubmitButton.addEventListener("click", () => {
    registerUser(
      registerUsernameInput.value,
      registerEmailInput.value,
      registerPasswordInput.value,
      registerPasswordConfirmInput.value
    );
  });
  document.addEventListener("mousedown", (element) => {
    if (element.target.closest("#loginContainer") === null) {
      if (
        loginFormBox.style.display !== "none" ||
        registerFormBox.style.display !== "none"
      ) {
        hideLoginRegisterForms();
      }
    }
  });
}

export function profilePhotoClickEvents(state) {
  profilePhoto.addEventListener("click", () => {
    if (profileForm.style.display === "flex") {
      profileForm.style.display = "none";
    } else {
      profileForm.style.display = "flex";
    }
    if (state.visitor === "saman") {
      profileFormAdminButton.style.display = "flex";
    } else {
      profileFormAdminButton.style.display = "none";
    }
  });

  profileFormAdminButton.addEventListener("click", () => {
    // console.count();
    state.pageType = "adminPage";
    state.searchPostIds = null;
    history.pushState(state, "", "");
    pageConstructor(state);
    profileForm.style.display = "none";
  });
  profileFormLogOutButton.addEventListener("click", () => {
    // console.count();
    state.visitor = "guest";
    if (state.pageType === "adminPage") {
      state.pageType = "mainPage";
    }
    history.pushState(state, "", "");
    pageConstructor(state);
    profileForm.style.display = "none";
  });
}

function showLoginForm() {
  registerFormBox.style.display = "none";
  loginFormBox.style.display = "flex";
}

function showRegisterForm() {
  loginFormBox.style.display = "none";
  registerFormBox.style.display = "flex";
}

function loginUser(state, uName, password) {
  console.log(users, uName);
  const user = users.find(({ username }) => username === uName);
  console.log(user);
  if (user === undefined) {
    alert("Username is wrong");
    return;
  }
  if (user.password !== password) {
    alert("Password is wrong");
    return;
  }
  // using localStorage
  // const userData = localStorage.getItem(username);
  // if (userData === null) {
  //   alert("Username is wrong");
  //   return;
  // }
  // const userDataArray = userData.split("*-*");
  // if (userDataArray[1] !== password) {
  //   alert("Password is wrong");
  //   return;
  // }
  alert(`Welcome ${uName}`);

  state.visitor = uName;
  history.pushState(state, "", "");
  hideLoginRegisterForms();
  pageConstructor(state);
}

function registerUser(uName, email, password, confirmPassword) {
  const user = users.find(({ username }) => username === uName);
  if (user !== undefined) {
    alert("This username already exists");
    return;
  }
  // using localStorage
  // if (localStorage.getItem(username) !== null) {
  //   alert("This username already exists");
  //   return;
  // }
  if (password !== confirmPassword) {
    alert("Passwords were not the same");
    return;
  }

  users.push({
    username: uName,
    password: password,
    email: email,
    userTier: "normal",
  });
  // using localStorage
  // const userDataArray = [email, password, "bronzeUser"];
  // const userData = userDataArray.reduce((a, b) => a + "*-*" + b);
  // localStorage.setItem(username, userData);
  alert("You registered successfully You can login now");

  hideLoginRegisterForms();
}

function hideLoginRegisterForms() {
  loginFormBox.style.display = "none";
  registerFormBox.style.display = "none";
}

export function updateVisitorUiState(state) {}
