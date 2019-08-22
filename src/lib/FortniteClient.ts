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
   *
   *
   * @param {string} user
   * @memberof FortniteClient
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
    const response: IFortniteStatusResponse = {};
    const io =await this.sort($, response);
    console.log(io);
  }

  private sort($: CheerioStatic, response: IFortniteStatusResponse) {
    $("table").each((index: number, value: any) => {
      if (index === 0) {
        const $1 = cheerio.load($(value).html() as string);
        $1("tbody tr").each((i: number, v: any) => {
          if (i === 0) {
            $(v + " td").each((ind: number, val: any) => {
              if (ind !== 0) {
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

                  return response;
                }
              }
            });
          }
        });
      } else if (index === 1) {
        const $2 = cheerio.load($(value).html() as string);
      }
    });

    // return response;
  }
}

const o = new FortniteClient();
o.getStats("ionagamer");
