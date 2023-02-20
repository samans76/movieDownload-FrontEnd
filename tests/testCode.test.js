const funcs = require("../scripts/testCode.js");

describe("sum Function", () => {
  it("right answer - should return 7", () => {
    const answer = funcs.sum(4, 3);
    expect(answer).toBe(7);
  });
  it("wrong answer ", () => {
    const answer = funcs.sum(4, 3);
    expect(answer).not.toBe(8);
  });
});

describe("create html button with specific Text", () => {
  it("make next button", () => {
    const btn = funcs.createButton("next");
    console.log(btn.style);
    expect(btn.innerText).toBe("next");
    expect(btn.style.width).toBe("33px");
    expect(btn.style.width).not.toBe("32px");
  });
});
