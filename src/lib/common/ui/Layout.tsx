import { Outlet } from "react-router-dom";
import Content from "./Content";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Layout() {
  
  return (
    <div className={"page"}>
      <Navigation />
      <main className="main">
        <Content>
          <Outlet />
        </Content>
      </main>
      <Footer />
    </div>
  );
}
