const crypto = require("crypto");
const fs = require("fs");

module.exports = (file, secret) => {
  const algorithm = "aes-192-cbc";
  const key = crypto.scryptSync(secret, "salt", 24);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const data = fs.readFileSync(file, "utf8");

  let encrypted = "";

  cipher.on("readable", () => {
    let chunk;
    while (null !== (chunk = cipher.read())) {
      encrypted += chunk.toString("hex");
    }
  });

  cipher.on("end", () => {
    fs.writeFileSync(file, encrypted, "hex");
    console.log(`Your file "${file}" is now a secret`);
  });

  cipher.write(data);
  cipher.end();
};
