import { AppRoutes } from "../../lib/common/AppRoutes";

export default function Journey() {
  return (
    <div className="prose">
      <h1 className="hero__title">{AppRoutes.JOURNEY.title}</h1>
      <p>
        PolyShape's journey began in 2023 with research in the UK and in 2025 continued with an additional base in Greece. From the start, the focus has been to build health intelligence on mathematical foundations, to implement these foundations in software, and to translate them into both R&D and consulting for biomedical and healthcare applications.
      </p>
    </div>
  );
}
