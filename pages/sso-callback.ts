import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const getServerSideProps = (async ({ query }) => {
  const { redirect_url } = query;

  if (typeof redirect_url !== "string")
    return {
      props: {
        redirect_url: "/",
      },
    };

  return {
    props: { redirect_url },
  };
}) satisfies GetServerSideProps<{
  redirect_url: string;
}>;

export default function CharacterSheetPage({
  redirect_url,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  useEffect(() => {
    router.push(redirect_url);
  });
}
