import { FC } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Navigation from "./navigation/Navigation";
type TLayout = {
  children:
    | JSX.Element[]
    | JSX.Element
    | React.ReactElement
    | React.ReactElement[]
    | string;
};

const Layout: FC<TLayout> = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation />
      {children && children}
      <Footer />
    </>
  );
};

export default Layout;
