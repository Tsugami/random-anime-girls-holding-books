import { prisma } from "../lib/prisma";
import type { GetStaticProps, NextPage } from "next";

interface Props {
  languages: string[];
}

const Home: NextPage<Props> = ({ languages }) => {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <div>
        <ul className="flex flex-wrap space-x-3">
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
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

  return {
    props: { languages: languages.map((l) => l.lang) },
  };
};

export default Home;
