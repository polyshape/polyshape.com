export default function BrandLogo() {
  return (
    <div className="prose">
      <h1 className="hero__title">The logo</h1>
      <div className="brand__container">
        <picture className="brand__logo__container">
          <source srcSet="/logo_short.webp" type="image/webp" />
          <img src="/logo_short.png" alt="PolyShape" className="logo__brand" />
        </picture>
        <div>
          <p>
            The PolyShape logo is more than a representation of initials, it is a reflection of our mission. It embodies Generalized Health Intelligence (GHI) in motion: intelligence that adapts, learns, and rises to safeguard well-being. The abstract ‘P’ leans forward, evoking the relentless pursuit of progress, the drive to push boundaries in science and technology. The ‘S’ stands tall, representing balance, resilience, and the state of optimal health we strive to enhance and protect.
          </p>
          <p>
            This duality is intentional. Inspired by the harmony of opposing forces, the logo symbolizes the dynamic interplay of effort and ease, acceleration and stability, innovation and well-being. The vibrant orange reflects the energy of discovery, GHI’s power to accelerate breakthroughs, to move humanity forward. The deep blue embodies intelligence at rest, health that is safeguarded, sustained, and strengthened through knowledge. Together, they form a unified evolving health intelligence.
          </p>
        </div>
      </div>
    </div>
  );
}

