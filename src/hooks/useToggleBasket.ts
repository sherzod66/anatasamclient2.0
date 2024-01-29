import { useMemo, useState } from "react";
import { useAuth } from "./useAuth";
import {
  useGetBasketQuery,
  useToggleBasketMutation,
} from "@/lib/api/basket.api";

export const useToggleBasket = () => {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data } = useGetBasketQuery(auth.token);
  const [handlerToggle, { isLoading, isError, isSuccess }] =
    useToggleBasketMutation();
  return useMemo(
    () => ({
      auth,
      isOpen,
      setIsOpen,
      handlerToggle,
      isLoading,
      isError,
      isSuccess,
      data,
    }),
    [auth, isLoading, isError, isSuccess, isOpen, data]
  );
};
