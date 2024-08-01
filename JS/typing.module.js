/**************************************************\
* The `Typing` class provides a typewriter effect *
\************************************************/
export class Typing {
  constructor() {
    this.typewriterEffect = {
      aText: [
        "🎮 Welcome to the world of games! 🌍",
        "🕹️ Enjoy a diverse collection of exciting games. 🎉",
        "👾 Choose your favorite game and enjoy the unique gaming experience. 🚀",
        "🔍 Explore interesting information about each game before you start playing. 📚",
      ],
      iSpeed: 80,
      iIndex: 0,
      iTextPos: 0,
      sContents: "",
      destination: document.getElementById("typedtext"),
      isRunning: false,
      typewriter: function () {
        if (!this.isRunning) {
          this.isRunning = true;
          this.iIndex = 0;
          this.iTextPos = 0;
          this.sContents = "";
          this.destination.innerHTML = "";
          this.typewriterInner();
        }
      },
      typewriterInner: function () {
        if (this.iTextPos < this.aText[this.iIndex].length) {
          this.sContents += this.aText[this.iIndex].charAt(this.iTextPos);
          this.destination.innerHTML = this.sContents;
          this.iTextPos++;
          setTimeout(this.typewriterInner.bind(this), this.iSpeed);
        } else {
          this.iIndex++;
          if (this.iIndex < this.aText.length) {
            this.sContents += "<br />";
            this.iTextPos = 0;
            setTimeout(this.typewriterInner.bind(this), this.iSpeed);
            this.isRunning = true;
          } else {
            this.destination.classList.add("hide-item");
            this.isRunning = false;
          }
        }
      },
    };
  }
  typingchar() {
    this.typewriterEffect.typewriter();
  }
}
