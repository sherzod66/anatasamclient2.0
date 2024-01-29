import ProfilePage from "@/components/screens/profile/Profile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Anatasam | Личный кабинет",
};
export default function Profile() {
  return <ProfilePage />;
}
