export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="brand" href="/">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img src="/logo_short.png" alt="PolyShape" className="brand__logo" />
          </picture>
        </a>

        <nav className="menu">
          <a className="menu__item menu__item--active" href="#home">Home</a>
          <a className="menu__item" href="#mission">Mission</a>
          <a className="menu__item" href="#brand">Brand</a>
          <a className="menu__item" href="#rnd">R&amp;D</a>
          <a className="menu__item" href="#portfolio">Portfolio</a>
          <a className="menu__item" href="#news">News</a>
          <a className="menu__item" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
