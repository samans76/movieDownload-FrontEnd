import { createPosts } from "./mainPage.js";
import {
  loginRegisterClickEvents,
  profilePhotoClickEvents,
  updateVisitorUiState,
} from "./loginRegister.js";
import { headerSearchBarEvents } from "./search.js";
import { adminPostFormEvent } from "./adminPostForm.js";

const postsAndWeekChart = document.querySelector("#contents #rightContainer");
const UpdateAndGenres = document.querySelector("#contents #leftContainer");
// const downloadPost;
const adminPage = document.querySelector("#adminPostEnterForm");

const profilePhotoBox = document.querySelector("#loginContainer #profilePhoto");
const loginButton = document.querySelector("#loginBox");

let baseState = {
  visitor: "guest", // guest - username
  pageType: "mainPage", //  mainPage - adminPage - downloadPage
  pageIndex: "1", //  for mainPage currentPage, for dowmloadPage postName for adminPage doesnt matter
  searchPostIds: null, // null or array of ids
};
let state = JSON.parse(JSON.stringify(baseState));

pageConstructor(state);
activateEvents();

setTimeout(() => {
  alert(
    "login with  use: saman pass: 123 and go to adminPage by clicking on profilePhoto to post content"
  );
}, 200);

window.addEventListener("popstate", () => {
  console.log("popped");
  if (history.state === null) {
    pageConstructor(baseState);
    return;
  }

  // const visitorInfo = state.visitor;
  state = history.state;
  // state.visitor = visitorInfo;
  pageConstructor(state);
  setTimeout(() => window.scrollTo(0, 0), 1);
});

export function pageConstructor(state) {
  console.count();
  console.log(state);
  // visitor
  if (state.visitor === "guest") {
    profilePhotoBox.style.display = "none";
    loginButton.style.display = "flex";
  } else {
    loginButton.style.display = "none";
    profilePhotoBox.style.display = "flex";
  }

  // pageType - pageIndex
  if (state.pageType === "mainPage") {
    adminPage.style.display = "none";
    postsAndWeekChart.style.display = "flex";
    UpdateAndGenres.style.display = "flex";
    // downloadPost.style.display = "none";

    // searchText
    if (state.searchPostIds === null) {
      createPosts(state);
    } else {
      createPosts(state, state.searchPostIds);
    }
  }
  if (state.pageType === "downloadPage") {
    adminPage.style.display = "none";
    postsAndWeekChart.style.display = "none";
    UpdateAndGenres.style.display = "flex";
    // downloadPost.style.display = "flex";

    // state.pageIndex
  }
  if (state.pageType === "adminPage") {
    adminPage.style.display = "flex";
    postsAndWeekChart.style.display = "none";
    UpdateAndGenres.style.display = "none";
    // downloadPost.style.display = "none";
  }

  // close moreTab
  // document.querySelector("#headerMoreWindow").style.display = "none";
  document.querySelector("#headerMoreWindow").style.right = "-280px";
  document.querySelector("#headerMoreWindow").style.boxShadow =
    "0 0px 600px 25000px rgba(33, 28, 35, 0)";
}

function activateEvents() {
  loginRegisterClickEvents(state);
  profilePhotoClickEvents(state);
  headerSearchBarEvents(state);
  adminPostFormEvent();
  headerButtonsEvents();
}

function headerButtonsEvents() {
  [
    document.querySelector("#mainPageBtn"),
    document.querySelector("#mainPageBtnExtra"),
    document.querySelector("#headerLogo"),
  ].forEach((button) => {
    button.addEventListener("click", () => {
      // state = Object.assign(state, {
      //   downloadPage: "none",
      //   adminPage: "none",
      //   contents: "flex",
      //   currentMainPage: 1,
      // });
      state.pageType = "mainPage";
      state.pageIndex = "1";
      state.searchPostIds = null;
      history.pushState(state, "", "");
      pageConstructor(state);
    });
  });
  document.querySelector("#headerMore").addEventListener("click", () => {
    // document.querySelector("#headerMoreWindow").style.display = "flex";
    document.querySelector("#headerMoreWindow").style.right = "0px";
    document.querySelector("#headerMoreWindow").style.boxShadow =
      "0 0px 600px 25000px rgba(33, 28, 35, 0.5)";
  });
  document.addEventListener("mousedown", (element) => {
    if (element.target.closest("#headerMoreWindow") === null) {
      // document.querySelector("#headerMoreWindow").style.display = "none";
      document.querySelector("#headerMoreWindow").style.right = "-280px";
      document.querySelector("#headerMoreWindow").style.boxShadow =
        "0 0px 600px 25000px rgba(33, 28, 35, 0)";
    }
  });
}
