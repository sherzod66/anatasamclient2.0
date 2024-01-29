import Electronic from "@/components/screens/electrinic/Electronic";
import { GetElectronicById } from "@/server api/getElectronic";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const url = process.env.NEXT_PUBLIC_API_URL;

  const electronic = await GetElectronicById(id);

  const previousVideos = (await parent).openGraph?.videos || [];

  if (electronic)
    return {
      metadataBase: new URL(`${url}`),
      title: `Anatasam | ${electronic?.name}`,
      openGraph: {
        videos: [`${url}/${electronic.path}`, ...previousVideos],
      },
    };
  else
    return {
      metadataBase: new URL(`${process.env.CLIENT_API}`),
      title: `Anatasam | page not found`,
      openGraph: {
        videos: [`/404/404-status-code.png`, ...previousVideos],
      },
    };
}

export default async function Card({ params }: Props) {
  const electronic = await GetElectronicById(params.id);

  return <Electronic data={electronic} />;
}
