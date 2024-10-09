const fs = require("fs");
const path = require("path");

module.exports = async (context) => {
  const outputDir = path.join(context.appOutDir, "resources", "user_images");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log("Custom folder created:", outputDir);
  }
};
