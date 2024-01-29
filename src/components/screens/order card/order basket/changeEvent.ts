import { IInvitationInfo } from "@/types/invitationInfo.type";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IInvitationInfoEdit
  extends Omit<
    IInvitationInfo,
    "cardId" | "cardImage" | "cardPrice" | "quantity"
  > {}

export const changeEvent = (
  index: number,
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  data: IInvitationInfo[],
  name: keyof IInvitationInfoEdit,
  setData: Dispatch<SetStateAction<IInvitationInfo[]>>
) => {
  const editCard = [...data];
  editCard.splice(index, 1, { ...data[index], [name]: event.target.value });
  setData(editCard);
};
