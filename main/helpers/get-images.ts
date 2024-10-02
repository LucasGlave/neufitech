import { app } from "electron";
import fs from "fs";
import path from "path";

export const getImages = () => {
  const defaultImagesDir = path.join(
    __dirname,
    "../renderer/public/senal-comunicacion"
  );
  const userDataPath = app.getPath("userData");
  const userImagesDir = path.join(userDataPath, "user_images");

  try {
    const defaultImages = fs
      .readdirSync(defaultImagesDir)
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

    const userFiles = fs.existsSync(userImagesDir)
      ? fs
          .readdirSync(userImagesDir)
          .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
      : [];
    console.log(userFiles);
    const userImages = userFiles.map(
      (file) => `local://${path.join(userImagesDir, file)}`
    );
    return [...defaultImages, ...userImages];
  } catch (error) {
    console.error("Error reading images:", error);
    return [];
  }
};
