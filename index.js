const fs = require("fs");
const cipher = require("./cipher");
const file = process.argv[2];
const secretFile = ".key";

const init = () => {
  let secret = process.argv[3];

  if (!fs.existsSync(file)) {
    return console.log("File path passed to function does not exist");
  }

  if (!secret) {
    if (!fs.existsSync(secretFile)) {
      return console.log(
        "Must pass secret as second parameter to function or create .key file"
      );
    }

    secret = fs.readFileSync(secretFile, "utf8");
  }

  cipher(file, secret);
};

init();
