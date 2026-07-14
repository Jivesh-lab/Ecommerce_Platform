import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

/**
 * The Medusa fulfillment workflow only loads VARIANT-level dimensions
 * (items.variant.weight/length/height/width) — never product-level ones. The
 * Shiprocket provider therefore requires every variant to carry weight AND
 * length/width/height, or it throws "Missing dimensions/weight".
 *
 * This backfills variant dimensions (cm / grams) from the parent product's
 * weight where available, with folded-apparel defaults otherwise. Idempotent.
 *
 * Run: npx medusa exec ./src/scripts/fix-variant-dimensions.ts
 */
export default async function fixVariantDimensions({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const productModuleService = container.resolve(Modules.PRODUCT);

  const DEFAULTS = { weight: 400, length: 30, width: 25, height: 4 };

  const { data: variants } = await query.graph({
    entity: "variant",
    fields: [
      "id",
      "title",
      "weight",
      "length",
      "width",
      "height",
      "product.title",
      "product.weight",
    ],
  });

  logger.info(`Found ${variants?.length ?? 0} variants. Backfilling dimensions...`);
  let fixed = 0;
  for (const v of variants ?? []) {
    const patch: Record<string, number> = {};
    if (!v.weight) patch.weight = (v as any).product?.weight || DEFAULTS.weight;
    if (!v.length) patch.length = DEFAULTS.length;
    if (!v.width) patch.width = DEFAULTS.width;
    if (!v.height) patch.height = DEFAULTS.height;
    if (Object.keys(patch).length === 0) continue;

    await productModuleService.updateProductVariants(v.id, patch);
    fixed++;
    logger.info(
      `  ${(v as any).product?.title} / ${v.title} → ${JSON.stringify(patch)}`
    );
  }
  logger.info(
    `fix-variant-dimensions: updated ${fixed}/${variants?.length ?? 0} variants.`
  );
}
