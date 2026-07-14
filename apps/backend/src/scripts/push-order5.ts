import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createOrderFulfillmentWorkflow } from "@medusajs/medusa/core-flows";

export default async function push({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  // Push the most recent order that has no fulfillment yet.
  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "display_id", "created_at", "items.id", "items.quantity", "fulfillments.id"],
  });
  const order = (orders ?? [])
    .filter((o: any) => !o.fulfillments?.length)
    .sort((a: any, b: any) => String(b.created_at).localeCompare(String(a.created_at)))[0];

  if (!order) {
    logger.info("push: no unfulfilled order found (all orders already pushed).");
    return;
  }

  const items = (order.items ?? []).map((i: any) => ({ id: i.id, quantity: Number(i.quantity) || 1 }));
  logger.info(`push: creating Shiprocket fulfillment for order #${order.display_id} (${items.length} item(s))...`);
  try {
    await createOrderFulfillmentWorkflow(container).run({ input: { order_id: order.id, items } });
    const { data: [o] } = await query.graph({
      entity: "order",
      fields: ["display_id", "fulfillments.id", "fulfillments.data", "fulfillments.labels.tracking_number", "fulfillments.labels.tracking_url"],
      filters: { id: order.id },
    });
    const f = o?.fulfillments?.[0];
    logger.info("✅ SHIPROCKET ORDER CREATED — it is now on your dashboard.");
    logger.info(`   AWB / shipment: ${JSON.stringify(f?.data?.awb ?? f?.data?.shipment_id ?? f?.data)}`);
    logger.info(`   tracking: ${JSON.stringify(f?.labels)}`);
  } catch (err: any) {
    logger.error(`❌ FAILED: ${err?.message ?? err}`);
  }
}
