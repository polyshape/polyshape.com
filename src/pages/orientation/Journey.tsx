import { AppRoutes } from "../../lib/common/AppRoutes";

export default function Journey() {
  return (
    <div className="prose">
      <h1 className="hero__title">{AppRoutes.JOURNEY.title}</h1>
      <p>
        PolyShape was founded in 2023, with initial research activity in the UK, and expanded in 2025 with an additional base in Greece. From the outset, the company has focused on the development of multi-agent orchestration systems and their application through research, development and consulting across multiple domains.
      </p>
    </div>
  );
}
