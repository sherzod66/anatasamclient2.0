import Search from "@/components/screens/search/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anatasam | Результаты поиска",
};

export default function pageSearch() {
  return <Search />;
}
