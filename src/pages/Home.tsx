import Nav from "../ui/Nav";
import Footer from "../ui/Footer";

export default function Home() {
  return (
    <div className="page">
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

      <Nav />
      <main className="main">
        <section className="hero">
          <div className="hero__content">
            <h1 className="hero__title">Generalized Health Intelligence</h1>
            <p className="hero__subtitle">
              Building the Intelligence that Safeguards Us!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
