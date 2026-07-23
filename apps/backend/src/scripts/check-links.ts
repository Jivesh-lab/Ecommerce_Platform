import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function checkLinks({ container }: { container: MedusaContainer }) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  
  const { data: salesChannels } = await query.graph({ 
    entity: "sales_channel", 
    fields: ["id", "name", "stock_locations.*"] 
  });
  
  logger.info(`Sales Channels Links: ${JSON.stringify(salesChannels, null, 2)}`);
}
