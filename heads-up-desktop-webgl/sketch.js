let words = [
  "Business Intelligence",
  "Bissantz",
  "Planung",
  "Marketing",
  "Data Mining",
  "Power BI",
  "Werkstudent",
  "Data Warehouse",
  "Data Lake",
  "Big Data",
  "Datenintegration",
  "Self-Service",
  "Datenmodellierung",
  "Datensicherheit",
  "Reporting",
  "IT-Support",
  "Entwicklung",
  "Consulting",
  "Personalreferent",
  "Officeteam",
  "Vertriebsassistenz",
  "Forschung",
  "Dr. Nicolas Bissantz",
  "Dr. Bertram Küppers",
  "Michael Nordhausen",
  "Michael Westphal",
  "Wolf-Dieter Hofmann",
  "Benutzerverwaltung",
  "Benchmarking",
  "DSGVO",
  "OLAP Datenbank",
  "Relationale Datenbank",
  "Bissantz Service",
  "MDX-Statement",
  "Sparklines",
  "Typographische Skalierung",
  "Grafische Tabelle",
  "Rot",
  "Blau",
  "Magic Buttons",
  "Drill-Down",
  "KPI",
  "Splashing",
  "Hybridplanung",
  "Prozentwert",
  "Prozentuale Abweichung",
  "Quellbericht",
  "Datenqualität",
  "Online-Hilfe",
  "Chair AG",
  "Checkbox",
  "Produkthauptgruppe",
  "Microsoft SQL Server",
  "Back-up",
  "Transaktionsprotokoll",
  "Rohdaten",
  "Azure Synapse Analytics",
  "Vorsystem",
  "Fußball",
  "Cappuccino",
  "Mundharmonika",
  "Taylor Swift",
  "K-POP",
  "Tik-Tok",
  "Harry Potter",
  "Mallorca",
  "Weihnachten",
  "Nürnberg",
  "Apple",
  "Porsche",
  "Yoga",
  "Friends",
  "Techno",
  "Künstliche Intelligenz",
  "Dashboard",
  "Rot",
  "Blau",
  "Werbemittel",
  "TCB",
  "Deltamaster",
  "Sommerfest",
  "Glühwürmchen",
  "Vielleicht",
  "Cleopatra",
  "Napoleon",
  "Picasso",
  "Christoph Kolumbus",
  "Jeanne d'Arc",
  "Leonardo da Vinci",
  "Wolfgang Amadeus Mozart",
  "Cristiano Ronaldo",
  "Lukas Podolski",
  "Tiger Woods",
  "Serena Williams",
  "Steffi Graf",
  "Dirk Nowitzki",
  "Boris Becker",
  "Thomas Müller",
  "Johann Wolfgang von Goethe",
  "Frühling",
  "Sommer",
  "Herbst",
  "Winter",
  "Olaf Scholz",
  "Angela Merkel",
  "Barack Obama",
  "Helmut Kohl",
  "Gerhard Schröder",
  "Arnold Schwarzenegger",
  "John F. Kennedy",
  "Hund",
  "Katze",
  "Vogel",
  "Elefant",
  "Maus",
  "Giraffe",
  "Tiger",
  "Schlange",
  "Maus",
  "Elefant",
  "Giraffe",
  "Biene",
  "Wespe",
  "Mücke",
  "Fliege",
  "Libelle",
  "Schmetterling",
  "Frosch",
  "Fisch",
  "Wal",
  "Hai",
  "Quick and dirty",
  "Tatort",
  "Stromberg",
  "Dark",
  "Babylon Berlin",
  "Leonardo DiCaprio",
  "Brad Pitt",
  "Meryl Streep",
  "Tom Hanks",
  "Scarlett Johansson",
  "Robert Downey Jr.",
  "Jennifer Lawrence",
  "Denzel Washington",
  "Angelina Jolie",
  "Johnny Depp",
  "Beyoncé",
  "Taylor Swift",
  "Michael Jackson",
  "Madonna",
  "Elvis Presley",
  "Lady Gaga",
  "Frank Sinatra",
  "Whitney Houston",
  "Justin Timberlake",
  "Katy Perry",
  "Gone with the Wind",
  "Casablanca",
  "The Godfather",
  "Star Wars",
  "Pulp Fiction",
  "Forrest Gump",
  "The Shawshank Redemption",
  "The Dark Knight",
  "Titanic",
  "Avengers Endgame",
  "Friends",
  "Breaking Bad",
  "Game of Thrones",
  "The Simpsons",
  "The Sopranos",
  "Stranger Things",
  "The Big Bang Theory",
  "Seinfeld",
  "House of Cards",
  "Grey’s Anatomy",
  "Led Zeppelin",
  "The Beatles",
  "The Rolling Stones",
  "Queen",
  "Pink Floyd",
  "Nirvana",
  "AC/DC",
  "The Who",
  "U2",
  "The Eagles",
];
let word = 0;
let Regular, Bold, ExtraBold;
let shuffledArray = [];

let rounds = 0;
let roundA = 1;
let roundB = 1;
let time, barTime, sectionTime;
let sectionTimeOut = 90000; // 30s // 1s (1000 milliseconds)
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
  createCanvas(windowWidth, windowHeight, WEBGL);
  shuffledArray = shuffleArray(words);
  console.log(shuffledArray);
}

function draw() {
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
      card("#ffffff");
      game();
      processBar();
    }
  }
  if (pointsA <= 0) pointsA = 0;
  if (pointsB <= 0) pointsB = 0;
  //console.log("roundA: " + roundA + "; roundB: " + roundB);
}

function startPage() {
  if (gameOn === false) {
    let rotaX = map(mouseX, 0, windowWidth, -0.1, 0.1);
    let rotaY = map(mouseY, 0, windowHeight, 0.1, -0.1);
    rotateY(rotaX);
    rotateX(rotaY);
    /*
    if (
      mouseX >= windowWidth - 20 ||
      mouseX <= 20 ||
      mouseY >= windowHeight - 20 ||
      mouseY <= 20
    ) {
      rotateX(-rotaY);
      rotateY(-rotaX);
    }
      */
    push();
    card("#ffffff");
    translate(0, 0, 200);
    imageMode(CENTER);
    tint(0);
    image(img, 0, -height / 4, height / 6, height / 50);
    h1Content("#000000", "Heads Up!", false);
    translate(0, 0, -190);
    h2Content("#000000", "Hi, hier ist für Desktop!");
    pContent(
      "#000000",
      "Klicke zum Vollbild und drücke die Leertaste zum Start des Spiels.  \n Pfeil Auf: Überspringen; Pfeil Runter: Richtig!"
    );
    pop();
    if (pointsA <= 0) pointsA = 0;
    if (keyIsPressed === true) {
      if (keyCode === 32) {
        gameStarted = true;
        gameOn = true;
        sectionOn = true;
        card("#ffffff");
        time = millis();
        sectionTime = millis();
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

function changeWord() {
  word += 1;
  if (word >= words.length) word = 0;
}

function game() {
  h1Content("#000000", shuffledArray[word], true);
  if (keyIsPressed === true) {
    if (keyCode === UP_ARROW) {
      card("#be0019");
      h1Content("#ffffff", "Überspringen.", true);
      frameRate(3);
      changeWord();
      if (playerA === true) pointsA -= 1;
      else pointsB -= 1;
      //console.log("A win: " + pointsA + "; B win: " + pointsB);
      time = millis();
    } else if (keyCode === DOWN_ARROW) {
      card("#002d71");
      h1Content("#ffffff", "Richtig!", true);
      frameRate(3);
      changeWord();
      if (playerA === true) pointsA += 1;
      else pointsB += 1;
      //console.log("A win: " + pointsA + "; B win: " + pointsB);
      time = millis();
    }
  }
}

function pause() {
  card("#002d71");
  console.log("one section over.");
  if (playerA === true) h1Content("#ffffff", "Punkte: " + pointsA, false);
  else h1Content("#ffffff", "Punkte: " + pointsB, false);
  h2Content("#ffffff", roundB + ". Runde");
  pContent("#ffffff", "Tausche aus und drücke die Leertaste.");
}

function over() {
  card("#002d71");
  console.log("game over.");
  push();
  translate(0, 0, 200);
  imageMode(CENTER);
  tint(255);
  image(img, 0, -height / 4, height / 6, height / 50);
  h1Content("#ffffff", pointsA + " : " + pointsB, false);
  translate(0, 0, -190);
  h2Content("#ffffff", "Gut gespielt!");
  pContent("#ffffff", "Aktualisere die Seite, um das Spiel neu zu starten!");
  pop();
}

function processBar() {
  fill("#c8c8c8");
  rectMode(CORNER);
  barTime = millis() - sectionTime;
  bar = map(barTime, 0, sectionTimeOut, 0, width);
  rect(-width / 2, height / 2 - 20, bar, 20);
}

function h1Content(fCol, h1ContentText, pos) {
  textSize(height / 10);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 10);
  if (pos === true) {
    textFont(Bold);
    text(h1ContentText, 0, 0, width - height / 5, height - height / 5);
  }
  if (pos === false) {
    textFont(ExtraBold);
    text(
      h1ContentText,
      0,
      -height / 20,
      width - height / 5,
      height - height / 5
    );
  }
}

function h2Content(fCol, h2ContentText) {
  textFont(Bold);
  textSize(height / 30);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 20);
  text(h2ContentText, 0, height / 10, width - height / 5, height - height / 5);
}

function h3Content(fCol, h3ContentText) {
  textFont(Bold);
  textSize(height / 50);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 20);
  text(h3ContentText, 0, -height / 6, width - height / 5, height - height / 5);
}

function pContent(fCol, desText) {
  textFont(Regular);
  textSize(height / 50);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 30);
  text(desText, 0, 0 + height / 3, width - height / 5, height - height / 5);
}

function logo(col) {
  imageMode(CENTER);
  tint(col);
  image(imgBVL, width / 2, height / 2, 420, 43);
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

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
