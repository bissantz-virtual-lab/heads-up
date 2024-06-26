let button;
let permissionGranted = false;

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
  "Led Zeppelin",
  "The Beatles",
  "The Rolling Stones",
  "Queen",
  "Pink Floyd",
  "Nirvana",
  "AC/DC",
];
let shuffledArray = [];
let rounds = 3; // ------------------------ changable ------------------------ //

let word = 0;
let Regular, Bold, ExtraBold;

let R = 0;
let bar = 0;
let roundA = 1;
let roundB = 1;
let time, barTime, sectionTime;
//let sectionTimeOut = 120000; //1s (1000 milliseconds)
let sectionTimeOut = 10000; //1s (1000 milliseconds)

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
}

function setup() {
  createCanvas(windowWidth, windowHeight);

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

function shuffleArray(array) {
  let shuffled = array.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function h1Com(fCol, h1Text) {
  textSize(height / 10);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 10);
  textFont(Bold);
  text(
    h1Text,
    width / 2,
    height / 2 - height / 20,
    width - height / 5,
    height - height / 5
  );
}

function h1(fCol, h1Text, pos) {
  textSize(height / 12);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 12);
  if (pos === true) {
    textFont(Bold);
    text(h1Text, 0, 0, height - height / 5, width - height / 5);
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
  text(
    h2Text,
    width / 2,
    height / 2 + height / 10,
    width - height / 5,
    height - height / 5
  );
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

function h3(fCol, h3Text) {
  textFont(Bold);
  textSize(height / 30);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 20);
  text(h3Text, 0, width / 10, height - height / 5, width - height / 5);
}

function descriptionCom(fCol, desText) {
  textFont(Regular);
  textSize(height / 40);
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

function description(fCol, desText) {
  textFont(Regular);
  textSize(height / 40);
  fill(fCol);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textLeading(height / 30);
  text(desText, 0, width / 4, height - height / 5, width - height / 5);
}

function computer() {
  bg("#002d71");
  h1Com("#ffffff", "Hi,");
  h2Com("#ffffff", "bist du auf iOS?");
  descriptionCom(
    "#ffffff",
    "Zum Starten des Spiels bitte den Sensor aktivieren und das Gerät umdrehen."
  );
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

function startPage() {
  if (gameOn === false) {
    bg("#ffffff");
    push();
    translate(width / 2, height / 2);
    rotate(HALF_PI);
    h1("#000000", "Heads Up!", false);
    if (pointsA <= 0) pointsA = 0;
    h2("#000000", "Tippe zum Start. ");
    description(
      "#000000",
      "Nach oben klappen: Überspringen; Nach unten klappen: Richtig!"
    );
    pop();
  }
}

function touchStarted() {
  if (permissionGranted) {
    if (gameOn === false) {
      gameStarted = true;
      gameOn = true;
      sectionOn = true;
      bg("#ffffff");
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

function draw() {
  if (!permissionGranted) {
    computer();
    return;
  }

  R = int(rotationY * 100);
  //console.log(int(rotationY * 100));

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
    }
    if (sectionOn === true) {
      game();
      processBar();
    }
  }

  if (pointsA <= 0) pointsA = 0;
  if (pointsB <= 0) pointsB = 0;

  //console.log("roundA: " + roundA + "; roundB: " + roundB);
}

function game() {
  push();
  translate(width / 2, height / 2);
  rotate(HALF_PI);
  h1("#000000", shuffledArray[word], true);
  pop();

  if (R < -10 && R > -100) {
    bg("#be0019");
    push();
    translate(width / 2, height / 2);
    rotate(HALF_PI);
    h1("#ffffff", "Überspringen.", true);
    pop();
    frameRate(3);
    changeWord();
    if (playerA === true) pointsA -= 1;
    else pointsB -= 1;
    //console.log("A win: " + pointsA + "; B win: " + pointsB);
    time = millis();
  } else if (R < 100 && R > 10) {
    bg("#002d71");
    push();
    translate(width / 2, height / 2);
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
  bg("#ffffff");
  //console.log("one section over.");
  push();
  translate(width / 2, height / 2);
  rotate(HALF_PI);

  if (playerA === true) {
    h3("#002d71", "Team Blau");
    h1("#002d71", "Punkte: " + pointsA, false);
    h2("#002d71", roundB + ". Runde");
    description("#002d71", "Tausche aus und tippe zum Start.");
  } else {
    h3("#be0019", "Team Rot");
    h1("#be0019", "Punkte: " + pointsB, false);
    h2("#be0019", roundB + ". Runde");
    description("#be0019", "Tausche aus und tippe zum Start.");
  }
  pop();
}

function over() {
  bg("#002d71");
  //console.log("game over.");
  push();
  translate(width / 2, height / 2);
  rotate(HALF_PI);

  h1("#ffffff", pointsA + " : " + pointsB, false);
  h2("#ffffff", "Gut gespielt!");
  description("#ffffff", "Aktualisere die Seite, um das Spiel neu zu starten.");
  pop();
}

function processBar() {
  fill("#969696");
  rectMode(CORNER);
  barTime = millis() - sectionTime;
  bar = map(barTime, 0, sectionTimeOut, 0, height);
  rect(0, 0, width / 40, bar);
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

function changeWord() {
  word += 1;
  if (word >= words.length) word = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
