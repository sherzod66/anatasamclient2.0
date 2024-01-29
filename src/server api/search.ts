import { ICard } from "@/types/card.type";

export async function SearchCard(params: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_RESPONSE}/cards/search?name=${params}`,
    {
      method: "POST",
      next: { revalidate: 60 },
    }
  );
  const data = (await response.json()) as ICard[] | [];
  return data;
}
