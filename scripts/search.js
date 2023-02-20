import { pageConstructor } from "./pageHandling.js";
import { postsList } from "../resources/localDatabase.js";

export function headerSearchBarEvents(state) {
  const searchIcons = document.querySelectorAll(".searchBarIcon");
  // const searchBar = document.querySelector("#headerSearch #searchBar");
  const searchBars = document.querySelectorAll(".searchBar");
  searchBars.forEach((searchBar) => {
    searchBar.addEventListener("keypress", (e) => {
      const keyCode = e.code || e.key;
      if (keyCode === "Enter") {
        const searchPostIds = search(searchBar.value, state);

        state.pageType = "mainPage";
        state.pageIndex = "1";
        state.searchPostIds = searchPostIds;
        history.pushState(state, "", "");
        pageConstructor(state);
      }
    });
  });
  for (const [i, searchIcon] of searchIcons.entries()) {
    searchIcon.addEventListener("click", () => {
      const searchPostIds = search(searchBars[i].value, state);

      state.pageType = "mainPage";
      state.pageIndex = "1";
      state.searchPostIds = searchPostIds;
      history.pushState(state, "", "");
      pageConstructor(state);
    });
  }
}

function search(searchedText, state) {
  if (searchedText === "") return;
  const searchedTextLowercase = searchedText.toLowerCase();
  const resultPosts = [];
  // using localStorage
  // const postsListString = localStorage.getItem("postsList");
  // const postsList = JSON.parse(postsListString);

  for (const post of postsList) {
    const postLowercase = post.postName.toLowerCase();
    if (postLowercase === searchedTextLowercase) {
      if (resultPosts.includes(post)) continue;
      resultPosts.push(post);
    }
    // ignoring lowerCase
    if (
      searchedTextLowercase.includes(postLowercase) ||
      postLowercase.includes(searchedTextLowercase)
    ) {
      if (resultPosts.includes(post)) continue;
      resultPosts.push(post);
    }
    // ignoring space
    const textNoSpace = searchedTextLowercase.replace(/\s+/g, "");
    const postNoSpace = postLowercase.replace(/\s+/g, "");
    if (
      textNoSpace.includes(postNoSpace) ||
      postNoSpace.includes(textNoSpace)
    ) {
      if (resultPosts.includes(post)) continue;
      resultPosts.push(post);
    }
  }

  const resultPostIds = [];
  for (const post of resultPosts) {
    resultPostIds.push(post.postName);
  }

  return resultPostIds;
}
