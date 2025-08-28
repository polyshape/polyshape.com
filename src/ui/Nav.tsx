export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="brand" href="#">
          <span className="brand__mark">S</span> <span>PolyShape</span>
        </a>
        <nav className="menu">
          <a href="#" className="menu__item">Home</a>
          <div className="menu__group">
            <a href="#" className="menu__item">Mission</a>
          </div>
          <div className="menu__group">
            <a href="#" className="menu__item">Brand ▾</a>
          </div>
          <a href="#" className="menu__item">R&amp;D</a>
          <div className="menu__group">
            <a href="#" className="menu__item">Portfolio ▾</a>
          </div>
          <a href="#" className="menu__item">News</a>
          <a href="#" className="menu__item">Contact</a>
        </nav>
      </div>
    </header>
  );
}
