const core = require('@actions/core');
const dotenvAction = require('./dotenv_action');
try {
  const dotenvFile = core.getInput("path");
  const variables = dotenvAction(dotenvFile);
  console.log(variables);

  core.setOutput("generic", "please check for actual outputs");
  
  for (const key in variables) {
    const value = variables[key];
    core.setOutput(key, value);
  }
  
} catch (error) {
  core.setFailed(error.message);
}