import { http, HttpResponse, delay } from "msw";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

export const handlers = [
  http.post("/api/contact", async ({ request }) => {
    // configurable delay (default 1s)
    const delayTime = Number(import.meta.env.VITE_MSW_DELAY ?? 1500);
    await delay(delayTime);

    const body = (await request.json()) as ContactPayload;
    if (body.message.toLocaleLowerCase().includes("fail")) {
      return HttpResponse.json(
        {
          ok: false,
          error: "Forced failure"
        },
        {
          status: 400
        }
      );
    }
    return HttpResponse.json({
      ok: true,
      message: "Mocked response from MSW"
    });
  })
];
