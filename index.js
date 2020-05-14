const fs = require("fs");
const cipher = require("./cipher");
const [, , file, secret] = process.argv;

const init = () => {
  if (!fs.existsSync(file)) {
    return console.log("File path passed to function does not exist");
  }

  if (!secret) {
    return console.log("Must pass secret as second parameter to function");
  }

  cipher(file, secret);
};

init();
