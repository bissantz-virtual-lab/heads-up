let words = [
  "Business Intelligence",
  "Taylor Swift",
  "Bissantz",
  "Planung",
  "Marketing",
  "Data Mining",
  "Power BI",
  "Fußball!",
  "Cappuccino",
  "Mundharmonika",
  "Mallorca",
  "Weihnachten",
  "Nürnberg",
  "K-POP",
  "Tik-Tok",
  "Harry Potter",
  "Werkstudent:innen",
  "Apple",
  "Prosche",
  "Yoga",
  "Data Warehouse",
  "Data Lake",
  "Big Data",
  "Datenintegration",
  "Self-Service",
  "Datenmodellierung",
  "Datensicherheit",
  "Reporting",
];
let shuffledArray = [];
let word = 0;
let Regular, Bold, ExtraBold;

let roundA = 1;
let roundB = 1;
let rounds = 1;
let time, barTime, sectionTime;
let sectionTimeOut = 20000; // 30s // 1s (1000 milliseconds)
let bar = 0;

let playerA = true;
let pointsA = 0;
let pointsB = 0;
let gameStarted = false;
let gameOn = false;
let sectionOn = false;

function preload() {
  Regular = loadFont("OpenSans-Regular.ttf");
  Bold = loadFont("OpenSans-Bold.ttf");
  ExtraBold = loadFont("OpenSans-ExtraBold.ttf");
  img = loadImage("./Bissantz-Logo_1000x100px_weiss.png");
  imgBVL = loadImage("./bvl_Logo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shuffledArray = shuffleArray(words);
  console.log(shuffledArray);
}

function draw() {
  frameRate(60);
  bg("#ffffff");
  startPage();
  if (millis() - sectionTime >= sectionTimeOut) {
    sectionOn = false;
  }
  if (roundB >= rounds + 1) gameOn = false;
  if (gameStarted === true && gameOn === false) over();
  if (gameOn === true) {
    if (sectionOn === false) {
      pause();
      if (keyIsPressed === true) {
        if (keyCode === 32) {
          sectionOn = true;
          sectionTime = millis();
          if (playerA === true) {
            roundA += 1;
            playerA = false;
          } else {
            roundB += 1;
            playerA = true;
          }
        }
      }
    }
    if (sectionOn === true) {
      game();
      processBar();
    }
  }
  if (pointsA <= 0) pointsA = 0;
  if (pointsB <= 0) pointsB = 0;
  console.log("roundA: " + roundA + "; roundB: " + roundB);
}

function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function startPage() {
  if (gameOn === false) {
    bg("#ffffff");
    h1("#000000", "Heads Up!", false);
    if (pointsA <= 0) pointsA = 0;
    h2("#000000", "hi, hier ist für Desktop!");
    description(
      "#000000",
      "Klicke zum Vollbild und drücke die Leertaste zum Start.  \n Pfeil Auf: Überspringen, Pfeil Runter: Richtig!"
    );
    if (keyIsPressed === true) {
      if (keyCode === 32) {
        gameStarted = true;
        gameOn = true;
        sectionOn = true;
        bg("#ffffff");
        time = millis();
        sectionTime = millis();
      }
    }
  }
}

function changeWord() {
  word += 1;
  if (word >= words.length) word = 0;
}

function game() {
  h1("#000000", shuffledArray[word], true);
  if (keyIsPressed === true) {
    if (keyCode === UP_ARROW) {
      bg("#be0019");
      h1("#ffffff", "Überspringen.", true);
      frameRate(3);
      changeWord();
      if (playerA === true) pointsA -= 1;
      else pointsB -= 1;
      console.log("A win: " + pointsA + "; B win: " + pointsB);
      time = millis();
    } else if (keyCode === DOWN_ARROW) {
      bg("#002d71");
      h1("#ffffff", "Richtig!", true);
      frameRate(3);
      changeWord();
      if (playerA === true) pointsA += 1;
      else pointsB += 1;
      console.log("A win: " + pointsA + "; B win: " + pointsB);
      time = millis();
    }
  }
}

function pause() {
  bg("#002d71");
  console.log("one section over.");
  if (playerA === true) h1("#ffffff", "Punkte: " + pointsA, false);
  else h1("#ffffff", "Punkte: " + pointsB, false);
  h2("#ffffff", "Runde: " + roundB + "/" + rounds);
  description("#ffffff", "Tausche aus und drücke die Leertaste.");
}

function over() {
  bg("#002d71");
  console.log("game over.");
  h1("#ffffff", pointsA + " : " + pointsB, false);
  h2("#ffffff", "Gut gespielt!");
  description("#ffffff", "Aktualisere die Seite, um das Spiel neu zu starten!");
}

function bg(color) {
  background("#f7f7f7");
  fill(color);
  noStroke();
  rectMode(CENTER);
  rect(
    width / 2,
    height / 2,
    width - height / 10,
    height - height / 10,
    height / 20
  );
}

function h1(fCol, h1Text, pos) {
  textSize(height / 10);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 10);
  if (pos === true) {
    textFont(Bold);
    text(
      h1Text,
      width / 2,
      height / 2,
      width - height / 5,
      height - height / 5
    );
  }
  if (pos === false) {
    textFont(ExtraBold);
    text(
      h1Text,
      width / 2,
      height / 2 - height / 20,
      width - height / 5,
      height - height / 5
    );
  }
}

function h2(fCol, h2Text) {
  textFont(Bold);
  textSize(height / 30);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 20);
  text(
    h2Text,
    width / 2,
    height / 2 + height / 10,
    width - height / 5,
    height - height / 5
  );
}

function h3(fCol, h3Text) {
  textFont(Bold);
  textSize(height / 50);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 20);
  text(
    h3Text,
    width / 2,
    height / 2 - height / 6,
    width - height / 5,
    height - height / 5
  );
}

function description(fCol, desText) {
  textFont(Regular);
  textSize(height / 50);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 30);
  text(
    desText,
    width / 2,
    height / 2 + height / 3,
    width - height / 5,
    height - height / 5
  );
}

function logo(col) {
  imageMode(CENTER);
  tint(col);
  image(imgBVL, width / 2, height / 2, 420, 43);
}

function processBar() {
  fill("#c8c8c8");
  rectMode(CORNER);
  barTime = millis() - sectionTime;
  bar = map(barTime, 0, sectionTimeOut, 0, width);
  rect(0, height - 20, bar, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
