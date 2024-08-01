import { Typing } from "./typing.module.js";
import { Ui } from "./ui.module.js";
/*************************************************\
* The `Games` class manages the logic for fetching *
\*************************************************/
export class Games {
  constructor() {
    this.typed = new Typing();
    $(".navbar-nav .nav-link").each((index, item) => {
      if (index == 0) {
        $(item).on("click", () => {
          $(".navbar-nav .active").removeClass("active");
          $(item).addClass("active");
          $(".header").removeClass("d-none");
          $(".navbar-collapse").removeClass("show");
          this.getGames();
        });
      } else {
        $(item).on("click", () => {
          $(".navbar-nav .active").removeClass("active");
          $(item).addClass("active");
          $(".header").addClass("d-none");
          $(".navbar-collapse").removeClass("show");
          this.getCategoryFromApi(item.dataset.category);
        });
      }
    });
    this.uiApi = new Ui();
  }
  /********************************************************************\
  * Adds click events to game items to show game details when clicked *
\*******************************************************************/
  startEvent() {
    $(".container .inner-box").each((index, item) => {
      $(item).on("click", () => {
        let idGame = $(item).data("id");
        $("#detailsGame").removeClass("d-none");
        $(".navbar").addClass("d-none");
        $(".header").addClass("d-none");
        $(".content-Data").addClass("d-none");
        this.getGameDetails(idGame);
      });
    });
  }
  /************************************************************\
  * Fetches games based on the selected category from the API  *
\*************************************************************/
  async getCategoryFromApi(category) {
    this.startLoad();
    const URl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a427a6ac02mshf5373e646d6d766p128410jsnd1d067e4711c",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const endPointUrl = await fetch(URl, options);
      if (!endPointUrl.ok) {
        throw new Error(`Error: ${endPointUrl.status}`);
      }
      const responseFromApi = await endPointUrl.json();
      this.uiApi.DisplayGames(responseFromApi);
      this.startEvent();
    } catch (er) {
      console.error(`Error: ${er}`);
    }
  }
  /******************************************************************************************\
  * Fetches the list of all games from the API, displays them, and starts the typing effect *
\*******************************************************************************************/
  async getGames() {
    this.startLoad();
    const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a427a6ac02mshf5373e646d6d766p128410jsnd1d067e4711c",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const endPoint = await fetch(url, options);
      if (!endPoint.ok) {
        throw new Error(`Http error :${endPoint.status}`);
      }
      const res = await endPoint.json();
      this.uiApi.DisplayGames(res);
      this.startEvent();
      this.typed.typingchar();
    } catch (err) {
      console.error("Error:", err);
    }
  }
  /*****************************************************************************\
  * Shows the loading screen and disables scrolling while data is being loaded. *
\*******************************************************************************/
  startLoad() {
    $(".loader").fadeIn(0, () => {
      $(".loading").fadeIn(0);
    });
    $("body").css({
      overflow: "hidden",
    });
  }
  /**************************************\
  * Fetches details of a specific game *
\*************************************/
  async getGameDetails(id) {
    this.startLoad();
    const URL = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a427a6ac02mshf5373e646d6d766p128410jsnd1d067e4711c",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const endPointUrl = await fetch(URL, options);
      if (!endPointUrl.ok) {
        throw new Error(`Error: ${endPointUrl.status}`);
      }
      const responseApi = await endPointUrl.json();
      this.uiApi.displayDetails(responseApi);
    } catch (er) {
      console.error(`Error: ${er}`);
    }
  }
}
