const fs = require('fs')

let dotenv_action = function (dotenvFile) {
    
    if (!fs.existsSync(dotenvFile)){
        throw new Error('file does not exist');
    }

    const dotenv = require('dotenv').config({ path: dotenvFile });
    console.log("loading .env file from " + dotenvFile);
    
    const returnedMap = {};
    for (const key in dotenv.parsed) {
        const value = dotenv.parsed[key];
        const lowercase_key = key.toLocaleLowerCase()
        returnedMap[lowercase_key] = value;
    }
    return returnedMap;
}

module.exports = dotenv_action;