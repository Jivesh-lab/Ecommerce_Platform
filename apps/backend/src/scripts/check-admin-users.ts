import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
export default async function check({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const { data: users } = await query.graph({ entity: "user", fields: ["id", "email", "created_at"] });
  logger.info(`ADMIN USERS: ${users?.length ?? 0}`);
  for (const u of users ?? []) logger.info(`  - ${u.email} (${u.id})`);
  // Auth identities (email/password providers)
  try {
    const authModule: any = container.resolve(Modules.AUTH);
    const ids = await authModule.listAuthIdentities({}, { take: 20 });
    logger.info(`AUTH IDENTITIES: ${ids?.length ?? 0}`);
    for (const a of ids ?? []) {
      const providers = (a.provider_identities ?? []).map((p: any) => `${p.provider}:${p.entity_id}`).join(", ");
      logger.info(`  - ${providers}`);
    }
  } catch (e: any) { logger.info(`auth identity check skipped: ${e?.message}`); }
}
