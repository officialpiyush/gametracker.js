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
import fetch, { Response } from "node-fetch";

class CSGOClient {
  private baseURL: string;

  public constructor() {
    this.baseURL = "https://csgo-stats.com/player/";
  }

  public async getStats(user: string) {
    const res = await fetch(`${this.baseURL}${user}`).then((r: Response) =>
      r.text(),
    );
    const $ = cheerio.load(res);
    if (
      $("h4")
        .text()
        .includes("PRIVATE PROFILE")
    ) {
    }
  }
}

const u = new CSGOClient();
u.getStats("shroud");
