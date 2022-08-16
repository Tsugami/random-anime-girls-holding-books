import { Octokit } from "octokit";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const octokit = new Octokit();

const REPO_OWNER = "cat-milk";
const REPO_NAME = "Anime-Girls-Holding-Programming-Books";
const VALID_PATH_REGEX = /\w+\.(png|gif|jpg|jpeg)$/;

const isValidPath = (path: string) => VALID_PATH_REGEX.test(path);

const getRepoFiles = () =>
  octokit.rest.git
    .getTree({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      tree_sha: "a183f801350184bd2c3ab15e66252c5f97eba41c",
      recursive: "true",
    })
    .then((res) => res.data.tree);

(async () => {
  const images = await prisma.images.findMany({ select: { path: true } });
  const alreadyExistingPaths = new Set(images.map((image) => image.path));

  const files = await getRepoFiles();

  const newFiles = files.filter(
    (file) =>
      file.path &&
      !alreadyExistingPaths.has(file.path) &&
      file.type === "blob" &&
      isValidPath(file.path)
  );

  const newImages = newFiles.map<Prisma.ImagesCreateManyInput>((file) => {
    const ext = file.path?.split(".").pop();
    const [lang, title] = file.path!.split("/");

    if (!title || !lang) {
      console.error(file);
      throw new Error(`Invalid path: ${file}, lang: ${lang}, title: ${title}`);
    }

    const data: Prisma.ImagesCreateManyInput = {
      path: file.path!,
      lang,
      title: title.replace(`.${ext}`, ""),
      extension: ext!,
      size: file.size!,
    };
    return data;
  });

  await prisma.images.createMany({
    data: newImages,
  });
})();
