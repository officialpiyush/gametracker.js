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
import InvalidFortniteUser from "./utils/errors/InvalidFortniteUser";
import { IFortniteStatusResponse } from "./utils/types";

/**
 * @class
 * @since 0.1.0
 */
export default class FortniteClient {
  private BaseURL: string;
  private sArray: number[];

  public constructor() {
    this.BaseURL = "https://www.fortbuff.com/players/";
    this.sArray = [
      0,
      2,
      3,
      5,
      6,
      8,
      9,
      11,
      12,
      14,
      15,
      17,
      18,
      20,
      21,
      23,
      24,
      26,
      27,
      29,
    ];
  }

  /**
   * Checks if an user exists
   *
   * @param name {string} - InGamename
   * @returns {Promise<boolean} - Whether the player exists or not
   */
  public async userExists(name: string): Promise<boolean> {
    const res = await fetch(`https://www.fortbuff.com/vault/players/${name}`);
    if (res.status === 404) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Gets Status
   *
   * @param {string} user - The InGameName of the user
   * @returns {Promise<IFortniteStatusResponse>} FortniteStatusResponse
   * @memberof FortniteClient
   * @throws {InvalidFortniteUser} - The InGameName supplied was not found!
   */
  public async getStats(user: string): Promise<IFortniteStatusResponse> {
    const isUser = await this.userExists(user);
    if (!isUser) {
      throw new InvalidFortniteUser(user);
    } else {
      const res = await fetch(`${this.BaseURL}${user}`, {
        headers: {
          "Origin": "fortbuff.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
        },
      }).then((r) => r.text());

      const $ = cheerio.load(res);

      const response: IFortniteStatusResponse = {
        name: user,
        matchesPlayed: "",
        totalScore: "",
        averageScore: "",
        totalKills: "",
        totalDeaths: "",
        killsPerMatch: "",
        killsPerDeath: "",
        victories: "",
        silverPlacements: "",
        bronzePlacements: "",
        lastPlayed: {
          readableTime: "",
          timestamp: "",
        },

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
      const timeTag = $("time").first();
      response.lastPlayed.timestamp = timeTag.attr("datetime");
      response.lastPlayed.readableTime = $(timeTag).text();

      let i: number = 0;
      const tables = $("table").get();
      const table1 = $(tables[0])
        .find("td")
        .get();

      for (i = 0; i < table1.length; i++) {
        if ([0, 5, 10, 15].includes(i)) {
          continue;
        } else if ([1, 6, 11, 16].includes(i)) {
          response.modes[this._getMode(i)].matches = $(table1[i]).text();
        } else if ([2, 7, 12, 17].includes(i)) {
          response.modes[this._getMode(i)].victory = $(table1[i]).text();
        } else if ([3, 8, 13, 18].includes(i)) {
          response.modes[this._getMode(i)].silver = $(table1[i]).text();
        } else if ([4, 9, 14, 19].includes(i)) {
          response.modes[this._getMode(i)].bronze = $(table1[i]).text();
        }
      }

      const table2 = $(tables[1])
        .find("td")
        .get();

      // tslint:disable: no-unused-expression
      for (i = 0; i < table2.length; i++) {
        if (this.sArray.includes(i)) {
          continue;
        } else {
          i === 1 ? (response.matchesPlayed = $(table2[i]).text()) : null;
          i === 4 ? (response.totalScore = $(table2[i]).text()) : null;
          i === 7 ? (response.averageScore = $(table2[i]).text()) : null;
          i === 10 ? (response.totalKills = $(table2[i]).text()) : null;
          i === 13 ? (response.totalDeaths = $(table2[i]).text()) : null;
          i === 16 ? (response.killsPerMatch = $(table2[i]).text()) : null;
          i === 19 ? (response.killsPerDeath = $(table2[i]).text()) : null;
          i === 22 ? (response.victories = $(table2[i]).text()) : null;
          i === 25 ? (response.silverPlacements = $(table2[i]).text()) : null;
          i === 28 ? (response.bronzePlacements = $(table2[i]).text()) : null;
        }
      }
      return response;
    }
  }

  /**
   * @private
   * @hidden
   *
   * @returns {string} - Game Mode
   */
  private _getMode(i: number): string {
    if (this._between(1, 5, i)) {
      return "all" as keyof IFortniteStatusResponse;
    } else if (this._between(5, 10, i)) {
      return "solo" as keyof IFortniteStatusResponse;
    } else if (this._between(10, 15, i)) {
      return "duo" as keyof IFortniteStatusResponse;
    } else if (this._between(15, 20, i)) {
      return "squad" as keyof IFortniteStatusResponse;
    } else {
      return "";
    }
  }

  /**
   * @private
   * @hidden
   *
   * @returns {boolean}  - If it is in between or not.
   */
  private _between(min: number, max: number, n: number): boolean {
    if (min <= n && max > n) {
      return true;
    } else {
      return false;
    }
  }
}
