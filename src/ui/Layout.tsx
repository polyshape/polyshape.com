import { Outlet, useLocation } from "react-router-dom";
import Content from "./Content";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className={`page ${isHome ? "page--home" : "page--no-video"}`}>
      {isHome && (
        <div className="page__bg">
          <video
            className="page__video"
            src="/bg.mp4"
            poster="/bg-poster.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="page__overlay" />
        </div>
      )}

      <Nav />
      <main className="main">
        {isHome ? <Outlet /> : (
          <Content>
            <Outlet />
          </Content>
        )}
      </main>
      <Footer />
    </div>
  );
}
