import { IElectronic } from "@/types/electronic.type";

export async function GetElectronicById(
  id: string
): Promise<IElectronic | undefined> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_RESPONSE}/electronic/${id}`,
    {
      next: { revalidate: 20 },
    }
  );

  const data = (await response.json()) as IElectronic | undefined;
  if (response.ok) {
    return data;
  } else return undefined;
}
