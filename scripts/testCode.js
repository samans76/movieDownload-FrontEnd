function sum(a, b) {
  return a + b;
}

function createButton(buttonText) {
  const btn = document.createElement("div");
  btn.setAttribute("class", "pageButton");
  btn.innerText = buttonText;
  btn.style.fontSize = "15px";
  btn.style.width = "33px";
  btn.style.height = "33px";
  btn.style.border = "1px solid rgb(0, 0, 0, 0.35)";
  btn.style.borderRadius = "4px";
  btn.style.display = "flex";
  btn.style.flexDirection = "row";
  btn.style.justifyContent = "center";
  btn.style.cursor = "pointer";

  return btn;
}

module.exports.sum = sum;
module.exports.createButton = createButton;
