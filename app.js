import { dataElements } from "./data.js";

const game = document.querySelector(".game");
const bgTriangle = document.querySelector(".bg-triangle");
const modal = document.querySelector(".modal");
document.querySelector(".rulesButton").addEventListener("click", openModal);
function openModal() {
  console.log("open modal");
  modal.classList.remove("hidden");
  if (window.screen.width < 401) {
    console.log(window.screen.width);
    document.querySelector(".container").classList.add("hidden");
  } else if (window.screen.width >= 401) {
    document.querySelector(".container").classList.remove("hidden");
  }
}
document.querySelector(".closeBtn").addEventListener("click", () => {
  modal.classList.add("hidden");
  document.querySelector(".container").classList.remove("hidden");
});
document.addEventListener("click", getTrgetClick);
let score = 0;
let yourID;
let compId;
let result;
let desktopResult;
let computerImg;
let randomNo;
let randomImg;
function getTrgetClick(e) {
  if (
    e.target.dataset.paper ||
    e.target.dataset.rock ||
    e.target.dataset.scissors
  ) {
    bgTriangle.classList.add("hidden");
    game.classList.remove("hidden");
    getGameImg(e.target.id);
  }
  if (e.target.dataset.play) {
    playAgain();
  }
}

function playAgain() {
  bgTriangle.classList.remove("hidden");
  game.classList.add("hidden");
  document.querySelector(".result").innerHTML = "";
}
function getGameImg(id) {
  let getImg = dataElements.filter((element) => {
    if (element.id === id) return element.img;
  })[0];
  yourID = getImg.id;

  computerImg = computerPlaceholderImgHtml();
  desktopResult = "";

  setTimeout(() => {
    computerImg = getComputerImg();
    desktopResult = getResultHtml();

    document.querySelector(".result").innerHTML = getResultHtml();
    desktopResult = render(getImg.img, getImg.id, "");
    document.querySelector(".score").textContent = getScore();
  }, 1000);

  render(getImg.img, getImg.id, "");

  return computerImg;
}

function computerPlaceholderImgHtml() {
  return `<div class="img-placeholder">
 
  </div>
   <p>Computer picked</p>
  `;
}
function getComputerImg() {
  randomNo = Math.floor(Math.random() * 3);
  randomImg = dataElements[randomNo];
  const compImg = randomImg.img;
  compId = randomImg.id;

  const compBorder = randomImg.id;
  return `<div class="game-img ${compBorder}">
    <img src="${compImg}" alt="" />
    </div>
     <p>Computer picked</p>`;
}

function getScore() {
  if (
    (yourID === "scissors" && compId === "paper") ||
    (yourID === "rock" && compId === "scissors") ||
    (yourID === "paper" && compId === "rock")
  ) {
    score++;
  } else if (
    (yourID === "rock" && compId === "paper") ||
    (yourID === "paper" && compId === "scissors") ||
    (yourID === "scissors" && compId === "rock")
  ) {
    if (score > 0) {
      score--;
    }
  }
  console.log(score);
  return score;
}

function getResultHtml() {
  if (
    (yourID === "paper" && compId === "paper") ||
    (yourID === "rock" && compId === "rock") ||
    (yourID === "scissors" && compId === "scissors")
  ) {
    result = "Tie";
  } else if (
    (yourID === "scissors" && compId === "paper") ||
    (yourID === "rock" && compId === "scissors") ||
    (yourID === "paper" && compId === "rock")
  ) {
    result = "You Win";
  } else if (
    (yourID === "rock" && compId === "paper") ||
    (yourID === "paper" && compId === "scissors") ||
    (yourID === "scissors" && compId === "rock")
  ) {
    result = "You Lose";
  }

  return ` <div>
  <h1>${result}</h1>
 <button class="play-again" data-play="play">PLAY AGAIN</button>
</div> `;
}

function getGameHtml(img, yourBorder, compBorder) {
  let gameHtml = ` <div class="your-img ">
 <div class="game-img ${yourBorder}">
   <img src="${img}" alt="" />
 </div>
 <p>You Picked</p>
</div>

<div class=" desktop">
 ${desktopResult}
</div>

<div class=" ">
${computerImg}
</div>`;

  return gameHtml;
}

function render(id, yourBorder, compBorder) {
  game.innerHTML = getGameHtml(id, yourBorder, compBorder);
}
