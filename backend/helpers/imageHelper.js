import os from "os";

export const getImageUrl = (imageName) => {
  if (imageName && !imageName.includes("http")) {
    const API_PREFIX = `http://${os.hostname()}:${
      process.env.PORT || 3000
    }/api`;
    imageName = `${API_PREFIX}/images/${imageName}`;
  }
  return imageName;
};
