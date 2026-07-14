import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
} from "@medusajs/framework/utils";

/**
 * One-off repair for a store that was seeded BEFORE Shiprocket was wired up as a
 * fulfillment provider. Fresh installs get this from initial-data-seed.ts; this
 * script applies the same changes to an already-populated database without
 * wiping data. Safe to run more than once (idempotent).
 *
 * Run with:  npx medusa exec ./src/scripts/fix-shiprocket-existing.ts
 *
 * It does three things:
 *   1. Enables the `shiprocket_shiprocket` fulfillment provider at every stock
 *      location.
 *   2. Repoints existing non-return shipping options from `manual_manual` to
 *      `shiprocket_shiprocket` so fulfillments route to Shiprocket.
 *   3. Backfills package dimensions (length/width/height, cm) on products that
 *      lack them — Shiprocket refuses to create an order otherwise.
 */
export default async function fixShiprocketExisting({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  );
  const productModuleService = container.resolve(Modules.PRODUCT);

  const SHIPROCKET_PROVIDER = "shiprocket_shiprocket";

  // 1. Enable Shiprocket as a provider at every stock location -------------
  const { data: locations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  });

  for (const loc of locations) {
    try {
      await link.create({
        [Modules.STOCK_LOCATION]: { stock_location_id: loc.id },
        [Modules.FULFILLMENT]: {
          fulfillment_provider_id: SHIPROCKET_PROVIDER,
        },
      });
      logger.info(
        `fix-shiprocket: linked ${SHIPROCKET_PROVIDER} to location ${loc.name}`
      );
    } catch (err: any) {
      // Link already exists — that's fine.
      logger.info(
        `fix-shiprocket: provider link for location ${loc.name} already present (${err?.message ?? "exists"})`
      );
    }
  }

  // 2. Repoint non-return shipping options to Shiprocket -------------------
  const { data: shippingOptions } = await query.graph({
    entity: "shipping_option",
    fields: ["id", "name", "provider_id", "rules.attribute", "rules.value"],
  });

  for (const so of shippingOptions) {
    if (so.provider_id === SHIPROCKET_PROVIDER) continue;
    const isReturn = (so.rules ?? []).some(
      (r: any) => r.attribute === "is_return" && r.value === "true"
    );
    if (isReturn) continue; // leave return options on their current provider

    await fulfillmentModuleService.updateShippingOptions(so.id, {
      provider_id: SHIPROCKET_PROVIDER,
    });
    logger.info(
      `fix-shiprocket: shipping option "${so.name}" → ${SHIPROCKET_PROVIDER}`
    );
  }

  // 3. Backfill package dimensions on products lacking them ----------------
  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title", "weight", "length", "width", "height"],
  });

  const DEFAULTS = { weight: 400, length: 30, width: 25, height: 4 };
  let fixed = 0;
  for (const p of products) {
    const patch: Record<string, number> = {};
    if (!p.weight) patch.weight = DEFAULTS.weight;
    if (!p.length) patch.length = DEFAULTS.length;
    if (!p.width) patch.width = DEFAULTS.width;
    if (!p.height) patch.height = DEFAULTS.height;
    if (Object.keys(patch).length === 0) continue;

    await productModuleService.updateProducts(p.id, patch);
    fixed++;
  }
  logger.info(
    `fix-shiprocket: backfilled dimensions on ${fixed}/${products.length} products`
  );

  logger.info("fix-shiprocket: done. New orders will now sync to Shiprocket.");
}
