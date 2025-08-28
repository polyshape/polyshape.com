import Nav from "../ui/Nav";
import Footer from "../ui/Footer";

export default function Home() {
  return (
    <>
      <Nav/>
      <main className="hero">
        <div className="hero__inner">
          <h1 className="hero__title">Generalized Health Intelligence</h1>
          <p className="hero__subtitle">Building the Intelligence that Safeguards Us!</p>
        </div>
      </main>
      <section className="spacer" />
      <Footer/>
    </>
  );
}
