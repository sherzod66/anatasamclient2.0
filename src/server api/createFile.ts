import { getToken } from "@/lib/api/api helper/apiCookies.helper";
import { IFileResult } from "@/types/file.types";

export const createFile = async (
  formData: FormData,
  folder: string
): Promise<string> => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_RESPONSE}/files?folder=${folder}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
      cache: "no-store",
    }
  );
  const response: IFileResult[] = await request.json();
  return response[0].url;
};

//${process.env.NEXT_PUBLIC_API_URL_RESPONSE}/files?folder=${folder}
