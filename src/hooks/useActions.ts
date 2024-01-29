import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "@/lib/auth/auth.slice";
import { actions as basketActions } from "@/lib/basket/basket.slice";
const rootActions = {
  ...actions,
  ...basketActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
