import 'whatwg-fetch';
import { vi, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from "./src/mocks/server-test";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers added during the tests.
afterEach(() => server.resetHandlers());

// Clean up once the tests are done.
afterAll(() => server.close());

vi.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => null
}));