import { Octokit, App } from "octokit";

const octokit = new Octokit();

const REPO_OWNER = "cat-milk";
const REPO_NAME = "Anime-Girls-Holding-Programming-Books";

octokit.rest.git
  .getTree({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    tree_sha: "a183f801350184bd2c3ab15e66252c5f97eba41c",
    recursive: true,
  })
  .then((res) => console.log(res.data));
