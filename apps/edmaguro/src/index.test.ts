import { describe, expect, it } from "vitest";

import worker from "./index";

type Request$ = Request<unknown, IncomingRequestCfProperties>;

describe("Worker", () => {
  it("tests worker", async () => {
    const request = new Request("http://localhost") satisfies Request$;
    const response = await worker.fetch(request);
    expect(response.status).toBe(301);
  });
});
