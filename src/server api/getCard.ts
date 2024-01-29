import { ICard } from "@/types/card.type";

export async function GetCard(id: string): Promise<ICard | undefined> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_RESPONSE}/cards/get-by-id/${id}`,
    {
      next: { revalidate: 10 },
    }
  );

  const data = (await response.json()) as ICard | undefined;
  if (response.ok) {
    return data;
  } else return undefined;
}
