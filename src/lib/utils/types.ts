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

export interface IFortniteStatusResponse {
  name: string;
  matchesPlayed: string;
  totalScore: string;
  averageScore: string;
  totalKills: string;
  totalDeaths: string;
  killsPerMatch: string;
  killsPerDeath: string;
  victories: string;
  silverPlacements: string;
  bronzePlacements: string;

  lastPlayed: {
    timestamp: string;
    readableTime: string;
  };
  modes: {
    all: {
      matches: string;
      victory: string;
      silver: string;
      bronze: string;
    };

    solo: {
      matches: string;
      victory: string;
      silver: string;
      bronze: string;
    };

    duo: {
      matches: string;
      victory: string;
      silver: string;
      bronze: string;
    };

    squad: {
      matches: string;
      victory: string;
      silver: string;
      bronze: string;
    };
  };
}
