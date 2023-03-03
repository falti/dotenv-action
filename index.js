const core = require("@actions/core");
const dotenvAction = require("./dotenv_action");
try {
  const dotenvFile = core.getInput("path");
  const logVariables = core.getInput("log-variables").toLowerCase() === "true";
  const maskVariables =
    core.getInput("mask-variables").toLowerCase() === "true";
  const exportVariables =
    core.getInput("export-variables").toLowerCase() === "true";
  const keysCase = core
    .getInput("keys-case", { required: false })
    .toLowerCase();
  const variables = dotenvAction(dotenvFile, keysCase, logVariables);

  if (maskVariables) {
    for (const key in variables) {
      const value = variables[key];
      core.setSecret(value);
    }
  }

  if (logVariables) {
    console.log(variables);
  } else {
    console.log(
      `loaded ${Object.keys(variables).length} values into the environment`
    );
  }

  core.setOutput("generic", "please check for actual outputs");

  for (const key in variables) {
    const value = variables[key];
    core.setOutput(key, value);

    if (exportVariables) {
      core.exportVariable(key, value);
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
