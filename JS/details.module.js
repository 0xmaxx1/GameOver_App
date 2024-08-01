import { Games } from "./home.module.js";
import { Ui } from "./ui.module.js";
/*******************************************************\
* The `Details` class fetches game details from an API  *
\******************************************************/
export class Details {
  constructor() {
    this.uiData = new Ui();
    this.homeinfo = new Games();
  }
  async getGameDetails(id) {
    this.homeinfo.startLoad();
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
      this.uiData.displayDetails(responseApi);
    } catch (er) {
      console.error(`Error: ${er}`);
    }
  }
}
