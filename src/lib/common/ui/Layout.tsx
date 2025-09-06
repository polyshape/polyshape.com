import { Outlet } from "react-router-dom";
import Content from "./Content";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className={"page"}>
      <Nav />
      <main className="main">
        <Content>
          <Outlet />
        </Content>
      </main>
      <Footer />
    </div>
  );
}
