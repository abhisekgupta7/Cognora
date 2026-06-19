import { payments } from "@/lib/db/schema";
import { getActiveOrgId } from "../../auth/services/org-context.service";
import db from "@/lib/db";
import { eq } from "drizzle-orm";

export default async function getOrganizationPayment() {
  // Logic to get the current payment information for the organization
  const orgId = await getActiveOrgId();
  if (!orgId) {
    throw new Error("No active organization context found");
  }

  const payment = await db
    .select()
    .from(payments)
    .where(eq(payments.org_id, orgId))
    .limit(1);
  return payment[0];
}
