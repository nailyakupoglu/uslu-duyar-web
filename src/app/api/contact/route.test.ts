/**
 * Amaç: Webhook zaman aşımında sabit 504 webhook_timeout döndüğünü doğrular.
 * Prop'lar: yok (node:test).
 * Kullanım: `pnpm test`.
 */
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, test } from "node:test";

import { POST } from "./route";

const server: Server = createServer(() => {
  // Bağlantıyı açık tut; yanıt vermeyerek webhook zaman aşımını tetikler.
});

const env = process.env as Record<string, string | undefined>;

test("webhook zaman aşımında 504 ve sabit hata kodu döner", async () => {
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const address = server.address() as AddressInfo;

  const previousWebhook = env.N8N_CONTACT_WEBHOOK_URL;
  const previousSecret = env.N8N_CONTACT_WEBHOOK_SECRET;
  const previousNodeEnv = env.NODE_ENV;
  const previousTimeout = env.CONTACT_WEBHOOK_TIMEOUT_MS;

  env.NODE_ENV = "test";
  env.CONTACT_WEBHOOK_TIMEOUT_MS = "80";
  env.N8N_CONTACT_WEBHOOK_URL = `http://127.0.0.1:${address.port}/hook`;
  delete env.N8N_CONTACT_WEBHOOK_SECRET;

  const logs: unknown[][] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    logs.push(args);
  };

  try {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.24"
        },
        body: JSON.stringify({
          name: "Ada Yilmaz",
          email: "ada@example.com",
          company: "Ornek Gida",
          message: "On ton narenciye icin teklif rica ederim."
        })
      })
    );
    const text = await response.text();

    assert.equal(response.status, 504);
    assert.deepEqual(JSON.parse(text), { ok: false, error: "webhook_timeout" });
    assert.equal(text.includes("127.0.0.1"), false);
    assert.equal(text.includes("TimeoutError"), false);
    assert.equal(text.includes("aborted"), false);
    assert.deepEqual(logs, [["[contact] n8n webhook timeout"]]);
  } finally {
    console.error = originalError;
    if (previousWebhook === undefined) delete env.N8N_CONTACT_WEBHOOK_URL;
    else env.N8N_CONTACT_WEBHOOK_URL = previousWebhook;
    if (previousSecret === undefined) delete env.N8N_CONTACT_WEBHOOK_SECRET;
    else env.N8N_CONTACT_WEBHOOK_SECRET = previousSecret;
    if (previousNodeEnv === undefined) delete env.NODE_ENV;
    else env.NODE_ENV = previousNodeEnv;
    if (previousTimeout === undefined) delete env.CONTACT_WEBHOOK_TIMEOUT_MS;
    else env.CONTACT_WEBHOOK_TIMEOUT_MS = previousTimeout;
  }
});

after(() => {
  server.closeAllConnections();
  server.close();
});
