import type { NextApiRequest, NextApiResponse } from "next";
import { getRandomImageUrl } from "../../lib/db";

const parseQuery = (query: string | string[] | undefined): string[] => {
  if (!query) return [];

  if (Array.isArray(query)) {
    return query.reduce<string[]>((acc, v) => {
      acc.push(...parseQuery(v));
      return acc;
    }, []);
  }

  return query.split(",");
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const tags = parseQuery(_req.query.tags);
  const uri = await getRandomImageUrl(tags);

  if (!uri) {
    return res.status(404).json({ error: "Image not found" });
  }

  res.redirect(uri);
}
