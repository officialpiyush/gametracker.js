const { FortniteClient } = require("../build/index");

const client = new FortniteClient();
client.getStats("ionagamdfgeer").then(r => console.log(r))