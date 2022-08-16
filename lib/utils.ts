import { Images } from "@prisma/client";

const BASE_URI = "https://raw.githubusercontent.com";
const REPO_NAME = `Anime-Girls-Holding-Programming-Books` 
const BRANCH_NAME = `master`;
const REPO_OWNER = "cat-milk";

const URI = `${BASE_URI}/${REPO_OWNER}/${REPO_NAME}/${BRANCH_NAME}`;


export const getImageUrl = (imgPath: string) => `${URI}/${imgPath}`;
