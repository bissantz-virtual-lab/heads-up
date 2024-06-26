let button;
let permissionGranted = false;
let cardR = 0;

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

let rounds = 1;
let roundA = 1;
let roundB = 1;
let time, barTime, sectionTime;
let sectionTimeOut = 30000; //1s (1000 milliseconds)
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
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  shuffledArray = shuffleArray(words);
  console.log(shuffledArray);
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        let button = createButton("Sensor aktivieren");
        button.style(
          "transform: translate(-50%, -50%);font-family: 'Open Sans'; font-weight: 600;font-size: 4vw; background-color: #ffffff;color: #002d71; padding: 1.5vh 3vh;border-radius: 8px;border: none;"
        );
        button.position(width / 2, height * 0.72);
        button.mousePressed(requestAccess);
        throw error;
      })
      .then(() => {
        permissionGranted = true;
      });
  } else computer();
}

function draw() {
  if (!permissionGranted) {
    computer();
    return;
  }
  cardR = int(rotationY * 100);
  //console.log(int(rotationY * 100));
  frameRate(60);
  background("#f7f7f7");
  startPage();
  if (millis() - sectionTime >= sectionTimeOut) {
    sectionOn = false;
  }
  if (roundB >= rounds + 1) gameOn = false;
  if (gameStarted === true && gameOn === false) over();
  if (gameOn === true) {
    if (sectionOn === false) {
      pause();
    }
    if (sectionOn === true) {
      card("#ffffff");
      game();
      processBar();
    }
  }
  if (pointsA <= 0) pointsA = 0;
  if (pointsB <= 0) pointsB = 0;
  //console.log("roundA: " + roundA + "; roundB: " + roundB);
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
    .catch(console.error);
  this.remove();
}

function touchStarted() {
  if (permissionGranted) {
    if (gameOn === false) {
      gameStarted = true;
      gameOn = true;
      sectionOn = true;
      card("#ffffff");
      time = millis();
      sectionTime = millis();
    }
    if (gameOn === true && sectionOn === false) {
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

function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function computer() {
  card("#002d71");
  h1Com("#ffffff", "Hi,");
  h2Com("#ffffff", "bist du auf iOS?");
  descriptionCom(
    "#ffffff",
    "Zum Starten des Spiels bitte den Sensor aktivieren und das Gerät umdrehen."
  );
}

function startPage() {
  if (gameOn === false) {
    let rotaY = map(rotationY, -PI, PI, -3, 9.28);
    rotateY(rotaY);
    push();
    card("#ffffff");
    translate(0, 0, 100);
    rotate(HALF_PI);
    h1("#000000", "Heads Up!", false);
    if (pointsA <= 0) pointsA = 0;
    translate(0, 0, -40);
    h2("#000000", "Tippe zum Start. ");
    translate(0, 0, -40);
    description(
      "#000000",
      "Nach oben klappen: Überspringen; Nach unten klappen: Richtig!"
    );
    translate(0, 0, -200);
    scale(1, -1);
    logo(0);
    pop();
  }
}

function changeWord() {
  word += 1;
  if (word >= words.length) word = 0;
}

function game() {
  push();
  rotate(HALF_PI);
  h1("#000000", shuffledArray[word], true);
  pop();
  if (cardR < -10 && cardR > -100) {
    card("#be0019");
    push();
    rotate(HALF_PI);
    h1("#ffffff", "Überspringen.", true);
    pop();
    frameRate(3);
    changeWord();
    if (playerA === true) pointsA -= 1;
    else pointsB -= 1;
    //console.log("A win: " + pointsA + "; B win: " + pointsB);
    time = millis();
  } else if (cardR < 100 && cardR > 10) {
    card("#002d71");
    push();
    rotate(HALF_PI);
    h1("#ffffff", "Richtig!", true);
    pop();
    frameRate(3);
    changeWord();
    if (playerA === true) pointsA += 1;
    else pointsB += 1;
    //console.log("A win: " + pointsA + "; B win: " + pointsB);
    time = millis();
  }
}

function pause() {
  card("#002d71");
  //console.log("one section over.");
  push();
  rotate(HALF_PI);
  if (playerA === true) h1("#ffffff", "Punkte: " + pointsA, false);
  else h1("#ffffff", "Punkte: " + pointsB, false);
  h2("#ffffff", roundB + ". Runde");
  description("#ffffff", "Tausche aus und tippe zum Start.");
  pop();
}

function over() {
  card("#002d71");
  //console.log("game over.");
  push();
  rotate(HALF_PI);
  translate(0, 0, 100);
  h1("#ffffff", pointsA + " : " + pointsB, false);
  translate(0, 0, -40);
  h2("#ffffff", "Gut gespielt!");
  translate(0, 0, -40);
  description("#ffffff", "Aktualisere die Seite, um das Spiel neu zu starten.");
  translate(0, 0, -200);
  scale(1, -1);
  logo(255);
  pop();
}

function h1Com(fCol, h1Text) {
  textSize(height / 10);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 10);
  textFont(Bold);
  text(h1Text, 0, -height / 20, width - height / 5, height - height / 5);
}

function h1(fCol, h1Text, pos) {
  textSize(height / 12);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 12);
  if (pos === true) {
    textFont(Bold);
    text(h1Text, -0, 0);
  }
  if (pos === false) {
    textFont(ExtraBold);
    text(h1Text, 0, -height / 20, height - height / 5, width - height / 5);
  }
}

function h2Com(fCol, h2Text) {
  textFont(Bold);
  textSize(height / 30);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 20);
  text(h2Text, 0, height / 10, width - height / 5, height - height / 5);
}

function h2(fCol, h2Text) {
  textFont(Bold);
  textSize(height / 30);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 20);
  text(h2Text, 0, height / 18, height - height / 5, width - height / 5);
}

function descriptionCom(fCol, desText) {
  textFont(Regular);
  textSize(height / 40);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 30);
  text(desText, 0, height / 3, width - height / 5, height - height / 5);
}

function description(fCol, desText) {
  textFont(Regular);
  textSize(height / 40);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 30);
  text(desText, 0, width / 4, height - height / 5, width - height / 5);
}

function logo(col) {
  imageMode(CENTER);
  tint(col);
  image(img, 0, 0, 400, 40);
}

function processBar() {
  fill("#969696");
  rectMode(CORNER);
  barTime = millis() - sectionTime;
  bar = map(barTime, 0, sectionTimeOut, 0, height);
  rect(-width / 2, -height / 2, width / 40, bar);
}

function card(color) {
  background("#f7f7f7");
  fill(color);
  noStroke();
  rectMode(CENTER);
  rect(0, 0, width - height / 10, height - height / 10, height / 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
