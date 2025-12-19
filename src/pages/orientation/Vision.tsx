import { AppRoutes } from "../../lib/common/AppRoutes";

export default function Vision() {
  return (
    <div className="prose">
      <h1 className="hero__title">{AppRoutes.VISION.title}</h1>
      <p>
        PolyShape envisions agentic systems that are modular and composable into larger systems. They reason under uncertainty, integrate multimodal data and their interrelations, and operate autonomously while enabling human intervention. Through structured multi-agent interaction, these systems give rise to collective intelligence.
      </p>
    </div>
  );
}
