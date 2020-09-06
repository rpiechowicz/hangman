import { Quote } from "./Quote.js";

class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: "pan tadeusz",
      category: "Utwór Literacki",
    },
    {
      text: "janko muzykant",
      category: "Utwór Literacki",
    },
    {
      text: "akademia pana fleksa",
      category: "Film",
    },
    {
      text: "ogniem i mieczem",
      category: "Film",
    },
    {
      text: "lekkoatletyka",
      category: "Sport",
    },
    {
      text: "kalesony",
      category: "Ubranie",
    },
    {
      text: "kalesony",
      category: "Ubranie",
    },
    {
      text: "zmywarka",
      category: "Urządzenia domowe",
    },
    {
      text: "telewizor",
      category: "Urządzenia domowe",
    },
    {
      text: "krzeslo",
      category: "Urządzenia domowe",
    },
    {
      text: "balkon",
      category: "Urządzenia domowe",
    },
    {
      text: "dywan",
      category: "Urządzenia domowe",
    },
    {
      text: "muffinki",
      category: "Jedzenie",
    },
    {
      text: "pierogi ruskie",
      category: "Jedzenie",
    },
    {
      text: "kotlet schabowy",
      category: "Jedzenie",
    },
    {
      text: "zupa pomidorowa",
      category: "Jedzenie",
    },
    {
      text: "pies",
      category: "zwierze",
    },
    {
      text: "kot",
      category: "zwierze",
    },
    {
      text: "kogut",
      category: "zwierze",
    },
    {
      text: "dinozaur",
      category: "zwierze",
    },
    {
      text: "mysz",
      category: "zwierze",
    },
    {
      text: "hipopotam",
      category: "zwierze",
    },
    {
      text: "szczur",
      category: "zwierze",
    },
    {
      text: "niemcy",
      category: "Państwo",
    },
    {
      text: "polska",
      category: "Państwo",
    },
    {
      text: "stany zjednoczone",
      category: "Państwo",
    },
    {
      text: "francja",
      category: "Państwo",
    },
    {
      text: "holandia",
      category: "Państwo",
    },
    {
      text: "hiszpania",
      category: "Państwo",
    },
    {
      text: "rosja",
      category: "Państwo",
    },
    {
      text: "hip hop",
      category: "Rodzaj muzyki",
    },
    {
      text: "rap",
      category: "Rodzaj muzyki",
    },
    {
      text: "disco polo",
      category: "Rodzaj muzyki",
    },
    {
      text: "jazz",
      category: "Rodzaj muzyki",
    },
    {
      text: "blues",
      category: "Rodzaj muzyki",
    },
    {
      text: "rock and roll",
      category: "Rodzaj muzyki",
    },
    {
      text: "bmw",
      category: "Marka samochodu",
    },
    {
      text: "audi",
      category: "Marka samochodu",
    },
    {
      text: "mercedes",
      category: "Marka samochodu",
    },
    {
      text: "ssang yong",
      category: "Marka samochodu",
    },
    {
      text: "toyota",
      category: "Marka samochodu",
    },
    {
      text: "honda",
      category: "Marka samochodu",
    },
    {
      text: "cisowianka",
      category: "Marka wody mineralnej",
    },

    {
      text: "iphone",
      category: "Marka telefonu",
    },
    {
      text: "lenovo",
      category: "Marka telefonu",
    },
    {
      text: "samsung",
      category: "Marka telefonu",
    },
    {
      text: "sony",
      category: "Marka telefonu",
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;

    const { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }

  guess(label, event) {
    event.target.disabled = true;
    if (this.quote.guess(label)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 1;

      if (this.currentStep === this.lastStep) this.loosing();
    }
  }

  drowLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (e) => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    this.wordWrapper.innerHTML = this.quote.getContent();
    if (!this.quote.getContent().includes("_")) {
      this.winning();
    }
  }

  clear() {
    this.lettersWrapper.innerHTML = "";
    this.categoryWrapper.innerHTML = "";
  }

  winning() {
    this.clear();
    this.wordWrapper.innerHTML = "Udało Ci się! Szczęście Ci sprzyja";
    this.wordWrapper.innerHTML += `<br><p style="font-size: 18px; letter-spacing: 1px">Rozwiązaniem było: ${this.quote.text}</p>`;
  }

  loosing() {
    this.clear();
    this.wordWrapper.innerHTML = "Ha Ha Ha! Looooser!";
    this.wordWrapper.innerHTML += `<br><p style="font-size: 18px; letter-spacing: 1px">Rozwiązaniem było: ${this.quote.text}</p>`;
  }

  start() {
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    this.drowLetters();
    this.drawQuote();
  }
}

const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});

game.start();
