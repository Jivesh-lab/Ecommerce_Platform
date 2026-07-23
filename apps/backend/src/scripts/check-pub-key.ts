import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function checkPubKey({ container }: { container: MedusaContainer }) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  
  const { data: pkeys } = await query.graph({ 
    entity: "api_key", 
    fields: ["id", "title", "token", "sales_channels.*"] 
  });
  
  logger.info(`Publishable Keys: ${JSON.stringify(pkeys, null, 2)}`);
}
