const fs = require("fs");
const data = { key: "value" };
fs.writeFileSync("data.json", JSON.stringify(data));
