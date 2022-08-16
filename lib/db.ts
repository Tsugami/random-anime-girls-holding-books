import { Images } from "@prisma/client";
import { prisma } from "./prisma";
import { getImageUrl } from "./utils";

const randomImage = async () => {
  const images = await prisma.$queryRaw<
    Images[]
  >`SELECT * FROM images ORDER BY random() LIMIT 1`;
  return images[0];
};

const randomImageByTags = async (tags: string[]) => {
  // TODO random image by tags
  return randomImage();
};

export const getRandomImageUrl = async (tags: string[]) => {
  const image = tags.length
    ? await randomImageByTags(tags)
    : await randomImage();
  return getImageUrl(image.path);
};
