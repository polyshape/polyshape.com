import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/contact", async () => {
    return HttpResponse.json({
      ok: true,
      message: "Mocked response from MSW"
    });
  })
];
