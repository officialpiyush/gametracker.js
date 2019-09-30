const { FortniteClient } = require("../build/index");

const client = new FortniteClient();

client.getStats("ionagamer").then(console.log); // Returns an Object. (IFortniteStatusResponse)

client.getStats("ionagamdfgeer").then(r => console.log(r)) //  Throws InvalidFortniteUser Error
