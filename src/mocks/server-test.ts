import { setupServer } from "msw/node";
import { handlers } from "./handlers-test";

export const server = setupServer(...handlers);
