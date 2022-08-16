import { prisma } from "../lib/prisma";
// import {} from '@prisma/client';
import type { GetStaticProps, NextPage } from "next";
import { Images } from "@prisma/client";
import { getImageUrl } from "../lib/utils";

interface Props {
  image: string;
}



const Random: NextPage<Props> = ({ image }) => {
  return (
    <img src={getImageUrl(image)} />
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({

}) => {
 const a = await fetch('/api/random').then(res => res.json()) as string;

  return {
    props: { image:  a },
  };
};

export default Random;
