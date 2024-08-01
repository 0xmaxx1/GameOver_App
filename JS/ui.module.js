import { Typing } from "./typing.module.js";
/************************************************************************\
* This `Ui` class handles the user interface logic for the application   *
\************************************************************************/
export class Ui {
  constructor() {
    this.sectionNameOffset = $(".content-Data").offset().top;
    this.paddingTopSection = +$(".content-Data")
      .css("padding-top")
      .replace("px", "");
    this.typewrite = new Typing();
    this.scrollGame;
  }
  /****************************************\
* DisplayGames displays a list of games.* 
\***************************************/
  DisplayGames(games) {
    let cartona = ``;
    games.forEach((el) => {
      cartona += `
      <div class="col-md-4 col-sm-6 col-lg-3">
    <div class="inner-box h-100 d-flex flex-column cursor-pointer" data-id="${el.id}">
      <img src="${el.thumbnail}" class="img-fluid" alt="${el.title}" />
      <div class="content position-relative d-flex flex-column flex-grow-1">
        <div
          class="head-content d-flex justify-content-between align-items-center"
        >
          <h4>${el.title}</h4>
          <span class="position-absolute top-0 end-0">Free</span>
        </div>
        <p class="text-center text-break flex-grow-1">
          ${el.short_description}
        </p>
        <div
          class="info-content mt-auto d-flex justify-content-between align-items-center"
        >
          <span>${el.genre}</span>
          <span>${el.platform}</span>
        </div>
      </div>
    </div>
  </div>
`;
    });
    $("#rowData").html(cartona);
    this.calcScroll();
    $(".dropsa").on("click", () => {
      this.Gotosection();
    });
    $("html, body").animate({ scrollTop: 0 }, 0);
    setTimeout(() => {
      this.endLoad();
    }, 200);
    this.typewrite.typewriterEffect.typewriter();
  }
  /********************************************************************\
  * Hides the loading  and restores the scroll behavior of the page.   *
\*******************************************************************/
  endLoad() {
    $(".loader").fadeOut(400, () => {
      $(".loading").fadeOut(200, () => {
        $("body").css({
          overflow: "auto",
        });
      });
    });
  }
  Gotosection() {
    $("html , body").css("scroll-behavior", "smooth");
    $(document).scrollTop(
      this.sectionNameOffset - this.paddingTopSection * 1.7
    );
  }
  /********************************************************************\
  * Monitors the scroll position of the document to show/hide elements *
\*******************************************************************/
  calcScroll() {
    $(document).on("scroll", () => {
      if (!$(".content-Data").hasClass("d-none")) {
        this.scrollGame = $(document).scrollTop();
        let sectionNameOffset = $(".content-Data").offset().top;
        let paddingTopSection = +$(".content-Data")
          .css("padding-top")
          .replace("px", "");
        if (
          this.scrollGame >=
          this.sectionNameOffset - this.paddingTopSection
        ) {
          if ($(".navbar").outerHeight() > 200) {
          }
          if (this.scrollGame >= 500) {
            $(".arrow").fadeIn();
            $(".arrow").on("click", () => {
              $("html , body").css("scroll-behavior", "smooth");
              $(document).scrollTop(0);
            });
          }
          $(".navbar").css({
            "background-color": "#b25c1d",
          });
        } else {
          $(".arrow").fadeOut(() => {
            $("html , body").css("scroll-behavior", "auto");
          });
          $(".navbar").css({
            "background-color": "#89512840",
          });
        }
      }
    });
  }
  /*****************************************************\
  * Displays detailed information about a specific game *
\*****************************************************/
  displayDetails(dataDetails) {
    let cartona = `
              <div class="container">
          <div
            class="head-details d-flex justify-content-between align-items-center"
          >
            <h2>Details Game</h2>
            <i class="fa-solid fa-xmark cursor-pointer"></i>
          </div>
          <div class="row pt-2 g-3">
            <div class="col-md-4">
              <div class="inner-Details">
                <img
                  src="${dataDetails.thumbnail}"
                  class="w-100"
                  alt="Game Details Image"
                />
              </div>
            </div>
            <div class="col-md-8">
              <div class="inner-Details">
                <h4>Tiltle : ${dataDetails.title}</h4>
                <h4>Category : <span>${dataDetails.genre}</span></h4>
                <h4>Platform : <span>${dataDetails.platform}</span></h4>
                <h4>Status : <span>${dataDetails.status}</span></h4>
                <p>
                  ${dataDetails.description}
                </p>
                  <a target="_blank"class="btn btn-outline-warning" href="${dataDetails.game_url}">Show Game</a>
              </div>
            </div>
          </div>
        </div>
    `;
    $("#detailsGame").html(cartona);
    this.closeSildeDetails();
    $("body").css({
      "background-image": `
        linear-gradient(to top, rgba(58, 33, 5, 0.66) 0%, rgba(58, 33, 5, 0.66) 100%),
        url('../imge/details.gif')
      `,
    });
    $(".arrow").fadeOut();
    setTimeout(() => {
      this.endLoad();
    }, 200);
  }
  /******************************************************************************************\
  * Handles the closing of the game details view and restores the previous state of the page *
\******************************************************************************************/
  closeSildeDetails() {
    $(".fa-xmark").on("click", () => {
      $("#detailsGame").addClass("d-none");

      $(".navbar").removeClass("d-none");
      $(".header").removeClass("d-none");
      $(".content-Data").removeClass("d-none");
      $("body").css({
        "background-image": `
          linear-gradient(to top, #3a21055d 0 100%),
    url(../imge/backGround.gif)
        `,
      });
      $("html, body").animate({ scrollTop: this.scrollGame }, 0);
      if ($(".all").hasClass("active")) {
        $(".header").removeClass("d-none");
      } else {
        $(".header").addClass("d-none");
      }
    });
  }
}
