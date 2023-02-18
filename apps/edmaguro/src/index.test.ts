import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { UnstableDevWorker } from "wrangler";
import { unstable_dev } from "wrangler";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
      vars: { WEBHOOK_URL: "https://example.com" },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("tests worker", async () => {
    const { status, url, redirected } = await worker.fetch();
    expect(status).toMatchInlineSnapshot("200");
    expect(url).toMatchInlineSnapshot(`"https://twitter.com/east9698"`);
    expect(redirected).toMatchInlineSnapshot("true");
  });
});
