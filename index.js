const core = require("@actions/core");
const dotenvAction = require("./dotenv_action");

try {
  const ensureExists = core.getInput("ensure-exists").toLowerCase();
  const keysCase = core.getInput("keys-case").toLowerCase();
  const logVariables = core.getInput("log-variables").toLowerCase();
  const maskVariables = core.getInput("mask-variables").toLowerCase();
  const exportVariables = core.getInput("export-variables").toLowerCase();

  const exportVariablesPrefix = core.getInput("export-variables-prefix");
  const path = core.getInput("path");

  const variables = dotenvAction({
    path: path || ".env",
    ensureExists: (ensureExists || "true") === "true",
    keysCase: keysCase || "lower",
  });

  if (maskVariables === "true") {
    for (const key in variables) {
      const value = variables[key];

      core.setSecret(value);
    }
  }

  core.info(
    logVariables === "true"
      ? JSON.stringify(variables, null, 2)
      : `Loaded ${Object.keys(variables).length} values into the environment.`,
  );

  core.setOutput("generic", "please check for actual outputs");

  for (const key in variables) {
    const value = variables[key];

    core.setOutput(key, value);

    if (exportVariables === "true") {
      core.exportVariable(exportVariablesPrefix + key, value);
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
