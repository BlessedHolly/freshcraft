import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Attention from "../../modals/Attention/Attention";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { TitleManager } from "../TitleManager/TitleManager";

function Layout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <TitleManager />
      <Attention />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
