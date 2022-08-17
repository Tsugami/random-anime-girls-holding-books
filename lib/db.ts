import { prisma } from "./prisma";
import { getImageUrl } from "./utils";

export interface Image {
  path: string;
  lang: string;
  title: string;
  extension: string;
  size: number;
}

const randomImage = async () => {
  const images = await prisma.$queryRaw<
  Image[]
  >`SELECT
  path,
  lang,
  title,
  extension,
  size
  FROM images ORDER BY random() LIMIT 1`;
  return images[0];
};

const randomImageByTags = async (tags: string[]) => {
  // TODO random image by tags
  return randomImage();
};


export const getRandomImage = async (tags: string[] = []): Promise<Image> => {
  const image = tags.length
    ? await randomImageByTags(tags)
    : await randomImage();
  return image
};


export const getRandomImageUrl = async (tags: string[] = []) => {
  return getImageUrl((await getRandomImage(tags)).path);
};
