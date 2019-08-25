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

/**
 * Thrown if an invalid ingamename was passed into [getStats()](https://gametracker.js.org/classes/fortniteclient.html#getstats) function.
 *
 * @export
 * @class InvalidFortniteUser
 * @extends {Error}
 */
export default class InvalidFortniteUser extends Error {
    public constructor(name: string) {
        super();
        this.name = "InvalidFortniteUser";
        this.message = `[Invalid InGamename] Got invalid InGameName: ${name}`;
    }
}
