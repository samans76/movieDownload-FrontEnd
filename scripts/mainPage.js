import { pageConstructor } from "./pageHandling.js";
import { postsList } from "../resources/localDatabase.js";

const postStructure = document.querySelector("#posts .post").cloneNode(true);
const pageBtnStructure = document
  .querySelector("#pagesList #buttonsSpot .pageButton")
  .cloneNode(true);

export function createPosts(state, searchPostIds = ["no search done"]) {
  const postCountInPage = 8;
  // using localStorage
  // const postsListString = localStorage.getItem("postsList");
  let posts = JSON.parse(JSON.stringify(postsList));
  if (posts === null || posts === undefined) return;
  const searchPosts = [];
  if (searchPostIds[0] !== "no search done") {
    for (const postId of searchPostIds) {
      for (const post of posts) {
        if (postId === post.postName) {
          searchPosts.push(post);
        }
      }
    }
    posts = JSON.parse(JSON.stringify(searchPosts));
  }
  const totalPages = Math.floor(posts.length / postCountInPage) + 1;
  const currentPage = parseInt(state.pageIndex);

  window.scrollTo({ top: 0, behavior: "smooth" });
  createPagePosts(posts, currentPage, postCountInPage);
  // start posts click events here (and disable all post events started before)
  createPagesList(totalPages, currentPage);
  addPageListClickEvents(state, currentPage);
}

function createPagesList(totalPages, currentPage) {
  for (const btn of document.querySelectorAll("#pagesList #buttonsSpot div")) {
    btn.remove();
  }

  if (totalPages <= 5) {
    createSimpleButtons(totalPages, currentPage);
    createBackButton(currentPage);
    createForwardButton(totalPages, currentPage);
  }
  if (totalPages > 5) {
    createComplexButtonNavigator(totalPages, currentPage);
    createBackButton(currentPage);
    createForwardButton(totalPages, currentPage);
  }
}

function createSimpleButtons(totalPages, currentPage) {
  const buttonsSpot = document.querySelector("#pagesList #buttonsSpot");
  for (let i = 1; i <= totalPages; i++) {
    const button = createButton(i.toString());
    if (i === currentPage) {
      button.style.backgroundColor = "#3889d0";
      button.style.color = "white";
    }
    buttonsSpot.appendChild(button);
  }
}

function createComplexButtonNavigator(totalPages, currentPage) {
  const buttonsSpot = document.querySelector("#pagesList #buttonsSpot");
  const btnShowCount = 2;

  // Create baseState.pageIndex Buttons
  const currentBtn = createButton(currentPage.toString());
  currentBtn.style.backgroundColor = "#3889d0";
  currentBtn.style.color = "white";
  buttonsSpot.appendChild(currentBtn);
  // Create before after Buttons
  for (let i = 1; i < btnShowCount + 1; i++) {
    if (currentPage + i <= totalPages) {
      const afterBtn = createButton((currentPage + i).toString());
      buttonsSpot.appendChild(afterBtn);
    }
    if (currentPage - i > 0) {
      const beforeBtn = createButton((currentPage - i).toString());
      buttonsSpot.insertBefore(
        beforeBtn,
        document.querySelector("#pagesList #buttonsSpot > div")
      );
    }
  }
  // Create first and last page
  if (currentPage < totalPages - btnShowCount - 1) {
    const afterDotBtn = createButton("...");
    afterDotBtn.style.cursor = "default";
    buttonsSpot.appendChild(afterDotBtn);
  }
  if (currentPage < totalPages - btnShowCount) {
    const lastBtn = createButton(totalPages.toString());
    buttonsSpot.appendChild(lastBtn);
  }
  if (currentPage > btnShowCount + 2) {
    const beforeDotBtn = createButton("...");
    beforeDotBtn.style.cursor = "default";
    buttonsSpot.insertBefore(
      beforeDotBtn,
      document.querySelector("#pagesList #buttonsSpot > div")
    );
  }
  if (currentPage > btnShowCount + 1) {
    const firstBtn = createButton("1");
    buttonsSpot.insertBefore(
      firstBtn,
      document.querySelector("#pagesList #buttonsSpot > div")
    );
  }
}

// need test
function createBackButton(currentPage) {
  if (currentPage === 1) return;
  const buttonsSpot = document.querySelector("#pagesList #buttonsSpot");
  const backButtonButton = createButton(">>");
  backButtonButton.style.fontSize = "13px";
  buttonsSpot.insertBefore(
    backButtonButton,
    document.querySelector("#pagesList #buttonsSpot > div")
  );

  return buttonsSpot; // this is for testing (test the button being made and attached to the spot)
}

function createForwardButton(totalPages, currentPage) {
  if (currentPage === totalPages) return;
  const buttonsSpot = document.querySelector("#pagesList #buttonsSpot");
  const forwardButton = createButton("<<");
  forwardButton.style.fontSize = "13px";
  buttonsSpot.appendChild(forwardButton);

  return buttonsSpot;
}

// need test
function createButton(buttonText) {
  const pageButton = pageBtnStructure.cloneNode(true);
  pageButton.innerText = buttonText;

  return pageButton;
}

function createPagePosts(postsList, currentPage, postCountInPage) {
  document.querySelector("#posts").innerHTML = "";
  if (postsList.length < 1) {
    const noResult = document.createElement("div");
    noResult.innerText = "No search results were found";
    noResult.style.fontSize = "20px";
    noResult.style.height = "50px";
    noResult.style.margin = "auto";
    noResult.style.display = "flex";
    noResult.style.flexDirection = "row";
    noResult.style.justifyContent = "center";
    document.querySelector("#contents #posts").appendChild(noResult);
  }
  postsList.reverse();
  const startIndex = (currentPage - 1) * postCountInPage;
  const endIndex = startIndex + postCountInPage - 1;
  for (let i = startIndex; i <= endIndex; i++) {
    if (i >= postsList.length) continue;
    createPost(postsList[i]);
  }
}

function addPageListClickEvents(state, currentPage) {
  const allButtons = document.querySelectorAll("#pagesList #buttonsSpot div");
  for (const button of allButtons) {
    button.addEventListener("click", () => {
      if (parseInt(button.innerText) > 0) {
        if (button.innerText === currentPage.toString()) return;
        state.pageIndex = button.innerText;
      } else {
        if (button.innerText === ">>") {
          const newCurrentPage = parseInt(state.pageIndex) - 1;
          state.pageIndex = newCurrentPage.toString();
        }
        if (button.innerText === "<<") {
          const newCurrentPage = parseInt(state.pageIndex) + 1;
          state.pageIndex = newCurrentPage.toString();
        }
      }

      state.pageType = "mainPage";
      history.pushState(state, "", "");
      pageConstructor(state);
    });
  }
}

function createPost(postData) {
  const post = postStructure.cloneNode(true);
  post.id = postData.postName;
  post.querySelector(".main .postPicture .picture img").src =
    postData.pictureLink;
  post.querySelector(".main .details .title .titleName span").innerText =
    postData.postName;
  post.querySelector(".main .details .score .scoreNumber").innerText =
    postData.score;
  if (Number(postData.score) < 7) {
    post.querySelector(".main .details .score .scoreNumber").style.color =
      "#ebb149";
  }
  if (Number(postData.score) < 5) {
    post.querySelector(".main .details .score .scoreNumber").style.color =
      "#ec484a";
  }
  post.querySelector(".main .details .country .countryText").innerText =
    postData.country;
  post.querySelector(".main .details .language .languageText").innerText =
    postData.language;
  post.querySelector(".main .details .duration .durationNumber").innerText =
    postData.duration;
  post.querySelector(".summery .summeryText").innerText = postData.summery;
  post.querySelector(
    ".episodeDetail .episodeDetailBox .seasonNumber"
  ).innerText = postData.seasonNumber;
  post.querySelector(
    ".episodeDetail .episodeDetailBox .episodeNumber"
  ).innerText = postData.episodeNumber;

  // Fill Years
  post.querySelector(".main .details .year .startYear").innerText =
    postData.startYear;
  if (postData.endYear === "" && !postData.isOnGoing) {
    post.querySelector(".main .details .year .dashText").remove();
  }
  post.querySelector(".main .details .year .endYear").innerText =
    postData.endYear;

  // Fill genres
  const genreChildren = post.querySelectorAll(
    ".main .details .genre .genreContent , .main .details .genre .andText"
  );
  for (const c of genreChildren) {
    c.remove();
  }
  if (postData.genreList.length > 0) {
    for (const [i, genre] of postData.genreList.entries()) {
      if (i === 0) {
        const genre1 = document.createElement("div");
        genre1.setAttribute("class", "genreContent");
        genre1.innerText = postData.genreList[0];
        post.querySelector(".main .details .genre").appendChild(genre1);
      } else {
        const genreSpan = document.createElement("span");
        genreSpan.setAttribute("class", "andText");
        genreSpan.innerText = ",";
        post.querySelector(".main .details .genre").appendChild(genreSpan);

        const genreDiv = document.createElement("div");
        genreDiv.setAttribute("class", "genreContent");
        genreDiv.innerText = postData.genreList[i];
        post.querySelector(".main .details .genre").appendChild(genreDiv);
      }
    }
  }

  if (!postData.isOnGoing) {
    post.querySelector(".main .onGoingShow .onGoingBox span").innerText =
      "اتمام پخش";
    post.querySelector(
      ".postPicture .onGoingShow .onGoingBox"
    ).style.backgroundColor = "#00b947";
  }

  const isMovie = postData.seasonNumber === "" && postData.episodeNumber === "";
  if (isMovie) {
    const episodeDetailSpans = post.querySelectorAll(
      ".episodeDetail .episodeDetailBox span"
    );
    for (const s of episodeDetailSpans) {
      s.remove();
    }

    post.querySelector(".download .downloadButton span").innerText =
      "دانلود فیلم";
    post.querySelector(".main .onGoingShow .onGoingBox").remove();
  }

  document.querySelector("#contents #posts").appendChild(post);
}

export function sum(a, b) {
  return a + b;
}

// module.exports.sum = sum;
