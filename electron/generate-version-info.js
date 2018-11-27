const dir = require("fs")
  .readdirSync("../binaries")
  .filter(file => file !== "index.json");
const package = require("../package.json");
console.log(
  JSON.stringify(
    Object.assign(
      {
        binaries: dir
      },
      package
    )
  )
);
