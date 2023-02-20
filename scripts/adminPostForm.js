import { postsList } from "../resources/localDatabase.js";

const postName = document.querySelector(
  "#adminPostEnterForm > div.nameSpot > input"
);
const score = document.querySelector(
  "#adminPostEnterForm > div.scoreSpot > input"
);
const country = document.querySelector(
  "#adminPostEnterForm > div.countrySpot > input"
);
const startYear = document.querySelector(
  "#adminPostEnterForm > div.yearSpot > input.startYearInput"
);
const endYear = document.querySelector(
  "#adminPostEnterForm > div.yearSpot > input.endYearInput"
);
const language = document.querySelector(
  "#adminPostEnterForm > div.languageSpot > input"
);
const duration = document.querySelector(
  "#adminPostEnterForm > div.durationSpot > input"
);
const summery = document.querySelector("#summeryInput");
const season = document.querySelector(
  "#adminPostEnterForm > div.episodeDetailSpot > input.seasonInput"
);
const episode = document.querySelector(
  "#adminPostEnterForm > div.episodeDetailSpot > input.episodeInput"
);
const pictureLink = document.querySelector(
  "#adminPostEnterForm > div.pictureSpot > input"
);
const downloadLink = document.querySelector(
  "#adminPostEnterForm > div.downloadLnkSpot > input"
);

const onGoingCheckbox = document.querySelector("#isOnGoingCheckbox");
const genreCheckboxes = document
  .querySelector("#adminPostEnterForm .genreGrid")
  .getElementsByTagName("input");

const postSubmitButton = document.querySelector(
  "#adminPostEnterForm > div.submitButtonSpot > input[type=submit]"
);

export function adminPostFormEvent() {
  postSubmitButton.addEventListener("click", () => {
    if (postName.value === "") return;

    const postGenres = [];
    for (const checkbox of genreCheckboxes) {
      if (checkbox.checked) {
        postGenres.push(checkbox.name);
      }
    }
    const postData = {
      postName: postName.value,
      score: score.value,
      genreList: postGenres,
      country: country.value,
      startYear: startYear.value,
      endYear: endYear.value,
      isOnGoing: onGoingCheckbox.checked,
      language: language.value,
      duration: duration.value,
      summery: summery.value,
      seasonNumber: season.value,
      episodeNumber: episode.value,
      pictureLink: pictureLink.value,
      downloadLink: downloadLink.value,
    };
    postsList.push(postData);
    // using localStorage
    // const postsListData = JSON.parse(localStorage.getItem("postsList"));
    // postsListData.push(postData);
    // localStorage.setItem("postsList", JSON.stringify(postsListData));

    postName.value = "";
    alert("the new post has been added");
  });
}
