import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SecondaryHeader from "./SecondaryHeader";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const excludeHeaderPaths = ["/sign-in", "/sign-up"];
  const shouldShowSecondaryHeader = excludeHeaderPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowSecondaryHeader ? <SecondaryHeader /> : <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
