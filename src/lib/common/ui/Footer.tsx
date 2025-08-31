export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="brand brand--small">
          <picture>
            <source srcSet="/logo_short.webp" type="image/webp" />
            <img src="/logo_short.png" alt="PolyShape" className="footer__logo" />
          </picture>
        </div>
        <div className="copy">
          Copyright © 2023-2025<br />
          PolyShape LTD. All rights reserved
        </div>
      </div>
    </footer>
  );
}
