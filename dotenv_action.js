const fs = require("fs");

let dotenv_action = function (dotenvFile, keysCase) {
  if (!fs.existsSync(dotenvFile)) {
    throw new Error("file does not exist");
  }

  const dotenv = require("dotenv").config({ path: dotenvFile });
  const dotenv_expand = require("dotenv-expand").expand(dotenv);
  console.log("loading .env file from " + dotenvFile);

  const returnedMap = {};
  for (const key in dotenv_expand.parsed) {
    const value = dotenv_expand.parsed[key];

    if (keysCase == "bypass") {
      returnedMap[key] = value;
    } else if (keysCase == "upper") {
      returnedMap[key.toLocaleUpperCase()] = value;
    } else {
      returnedMap[key.toLocaleLowerCase()] = value;
    }
  }
  return returnedMap;
};

module.exports = dotenv_action;
