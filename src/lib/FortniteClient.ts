/**
 * Copyright (C) 2019 Piyush
 *
 * This file is part of gametracker.js.
 *
 * gametracker.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * gametracker.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gametracker.js.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { IFortniteStatusResponse } from "./utils/types";

class FortniteClient {
  private BaseURL: string;

  public constructor() {
    this.BaseURL = "https://www.fortbuff.com/players/";
  }

  /**
   * Gets Status
   *
   * @param {string} user - The InGameName of the user
   * @returns {Promise<IFortniteStatusResponse>} FortniteStatusResponse
   * @memberof FortniteClient
   * @beta
   */
  public async getStats(user: string) {
    const res = await fetch(`${this.BaseURL}${user}`, {
      headers: {
        "Origin": "fortbuff.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
      },
    }).then((r) => r.text());

    const $ = cheerio.load(res);

    // @ts-ignore Cuz Im assigning em in sort function
    const response: IFortniteStatusResponse = {
      matchesPlayed: "",
      totalScore: "",
      scorePerMatch: "",
      totalKills: "",
      totalDeaths: "",
      killsPerMatch: "",
      killsPerDeath: "",
      victories: "",
      silverPlacements: "",
      bronzePlacements: "",

      modes: {
        all: {
          matches: "",
          victory: "",
          silver: "",
          bronze: "",
        },

        solo: {
          matches: "",
          victory: "",
          silver: "",
          bronze: "",
        },

        duo: {
          matches: "",
          victory: "",
          silver: "",
          bronze: "",
        },

        squad: {
          matches: "",
          victory: "",
          silver: "",
          bronze: "",
        },
      },
    };

    // console.log(tables)
    // const promises: any[] = [];
    return this.sort($, response, (i: IFortniteStatusResponse) => {
      console.log(1)
      return (i)
    });

    // console.log(response);
    // man u dont have multiple promises why will u use promise.all ?
    // what is not returning ?
    // you are submiting a form with this ?
    // so what is not working man i am not understanding
    // so listen i want it to fill in the response from documents
    // like see
    // it will put data in the page source ?#
    // no in the response object
    // yeah thats what i melai
    // line 51
    // reponse is an object that i will return from function
    // and then what ?
    // discord
    // response.modes.all.bronze = ($(val).html() as string)
    // .replace(/<small.*<\/small>/gi, "")
    // .replace("<!-- -->", "")
    // .trim();

    // no
    // getting page
    // i need it to write response
  }

  private sort(
    $: CheerioStatic,
    response: IFortniteStatusResponse, callback: any
  ) {
    $("table").map((index: number, value: any) => {
      if ($(value).hasClass("Table")) {
        return $(value).map((ind: number, val: any) => {
          if (ind === 1) {
            response.modes.all.matches = ($(val).html() as string)
              .replace(/<small.*<\/small>/gi, "")
              .replace("<!-- -->", "")
              .trim();
          } else if (ind === 2) {
            response.modes.all.victory = ($(val).html() as string)
              .replace(/<small.*<\/small>/gi, "")
              .replace("<!-- -->", "")
              .trim();
          } else if (ind === 3) {
            response.modes.all.silver = ($(val).html() as string)
              .replace(/<small.*<\/small>/gi, "")
              .replace("<!-- -->", "")
              .trim();
          } else if (ind === 4) {
            response.modes.all.bronze = ($(val).html() as string)
              .replace(/<small.*<\/small>/gi, "")
              .replace("<!-- -->", "")
              .trim();
          }
        });
      }
      return callback(response)
    });
  }
}

const o = new FortniteClient();
o.getStats("ionagamer").then((i) => console.log(i));
