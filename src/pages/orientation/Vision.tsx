import { AppRoutes } from "../../lib/common/AppRoutes";

export default function Vision() {
  return (
    <div className="prose">
      <h1 className="hero__title">{AppRoutes.VISION.title}</h1>
      <p>
        PolyShape envisions learning systems for healthcare built on mathematical foundations. These systems are modular and can be composed into larger systems. They reason under uncertainty, integrate diverse biomedical data and their interrelations, and support decisions that affect human health. Among their capabilities is multi-agent learning that advances health intelligence.
      </p>
    </div>
  );
}
