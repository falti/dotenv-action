const core = require("@actions/core");

const fs = require("node:fs");

/**
 * @param {object} kwargs
 * @param {boolean} kwargs.ensureExists ensure that the file exists
 * @param {'bypass' | 'lower' | 'upper'} kwargs.keysCase transform keys case or preserve them as they are
 * @param {string} kwargs.path a relative path from the repository root
 */
const dotenvAction = ({ path, keysCase, ensureExists }) => {
  const exists = fs.existsSync(path);

  if (!exists && ensureExists) {
    core.info(
      "Action will fail as it was unable to load the environment file from the provided path. If you wish to bypass this check, set the 'ensure-exists' option to 'false'.",
    );

    throw new Error(`Environment file not found at path: '${path}'`);
  }

  const dotenv = require("dotenv").config({ path: path });
  const dotenv_expand = require("dotenv-expand").expand(dotenv);

  core.info(`Loading environment file from path: '${path}'`);

  const returnedMap = {};

  for (const key in dotenv_expand.parsed) {
    const value = dotenv_expand.parsed[key];

    if (keysCase === "bypass") {
      returnedMap[key] = value;
    } else if (keysCase === "upper") {
      returnedMap[key.toLocaleUpperCase()] = value;
    } else {
      returnedMap[key.toLocaleLowerCase()] = value;
    }
  }

  return returnedMap;
};

module.exports = dotenvAction;
