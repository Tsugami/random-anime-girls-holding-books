import { prisma } from "../lib/prisma";
import type { GetStaticProps, NextPage } from "next";
import { getRandomImage, type Image } from "../lib/db";
import { getImageUrl } from "../lib/utils";

interface Props {
  languages: string[];
  randomImg: Image;
}

const Home: NextPage<Props> = ({ languages, randomImg }) => {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col justify-center items-center">
        <ul className="flex flex-wrap space-x-3">
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <div className="mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getImageUrl(randomImg.path)}
            alt={randomImg.title}
            className="max-w-lg max-h-lg w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const languages = await prisma.images.findMany({
    distinct: "lang",
    select: {
      lang: true,
    },
  });

  const random = await getRandomImage();

  return {
    props: { languages: languages.map((l) => l.lang), randomImg: random },
  };
};

export default Home;
