import { useGetCardsAdminQuery } from "@/lib/api/card.api";
import { ICard } from "@/types/card.type";
import { useEffect, useMemo, useState } from "react";

export const useCardResult = () => {
  const {
    data: globalCard,
    isLoading: cardLoading,
    isError,
  } = useGetCardsAdminQuery(null);
  const [cards, setCard] = useState<ICard[]>([]);
  useEffect(() => setCard(globalCard ? globalCard : []), [globalCard]);

  return useMemo(
    () => ({ cards, setCard, cardLoading }),
    [globalCard, cards, cardLoading]
  );
};
