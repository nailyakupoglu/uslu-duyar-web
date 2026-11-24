/**
 * Amaç: Node test sürecinde `@/` çözümleyici kancasını yükler.
 * Prop'lar: yok (module.register).
 * Kullanım: `node --import ./test/register-alias.mjs`.
 */
import { register } from "node:module";

register("./alias-hooks.mjs", import.meta.url);
