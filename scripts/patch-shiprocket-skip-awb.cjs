#!/usr/bin/env node
/**
 * Durable, idempotent patch for @sam-ael/medusa-plugin-shiprocket.
 *
 * Adds support for the SHIPROCKET_SKIP_AWB env flag: when "true", the plugin
 * creates the order on Shiprocket (free) but skips AWB assignment + pickup,
 * which require a funded wallet (min Rs 100). Runs on `postinstall` so the
 * change survives `npm install` (which would otherwise overwrite node_modules).
 *
 * Safe to run repeatedly and safe if the plugin isn't installed.
 */
const fs = require("fs");
const path = require("path");

const REL =
  "@sam-ael/medusa-plugin-shiprocket/.medusa/server/src/providers/shiprocket/client/index.js";

// Resolve against this repo's root node_modules (hoisted install).
const target = path.join(__dirname, "..", "node_modules", REL);

if (!fs.existsSync(target)) {
  // Plugin not installed (or path changed) — nothing to do, don't fail install.
  process.exit(0);
}

let src = fs.readFileSync(target, "utf8");

if (src.includes("SHIPROCKET_SKIP_AWB")) {
  // Already patched.
  process.exit(0);
}

const anchor =
  'throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Shiprocket order created but no shipment ID returned");\n            }';

const injection =
  anchor +
  `
            // [bacoola patch] SHIPROCKET_SKIP_AWB: stop after creating the order
            // (free) and skip AWB assignment + pickup, which require a funded
            // wallet. The order still appears under Shiprocket "New Orders".
            if (process.env.SHIPROCKET_SKIP_AWB === "true") {
                return {
                    ...orderCreated.data,
                    awb: "",
                    tracking_number: "",
                    tracking_url: "",
                };
            }`;

if (!src.includes(anchor)) {
  console.warn(
    "[patch-shiprocket-skip-awb] anchor not found — plugin version may have changed; skipping."
  );
  process.exit(0);
}

src = src.replace(anchor, injection);
fs.writeFileSync(target, src);
console.log("[patch-shiprocket-skip-awb] applied SHIPROCKET_SKIP_AWB support.");
