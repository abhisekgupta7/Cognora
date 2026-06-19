import { payments, subscriptions } from "@/lib/db/schema";
import { getActiveOrgId } from "../../auth/services/org-context.service";
import db from "@/lib/db";
import getOrganizationPayment from "./payment";

export const updatePayment = async (paymentData: any) => {
  const orgId = await getActiveOrgId();
  if (!orgId) {
    throw new Error("No active organization context found");
  }

  const payment = await db.insert(payments).values({
    amount: paymentData.total_amount,
    currency: paymentData.currency,
    product_id: paymentData.purchase_order_id,
    product_name: paymentData.purchase_order_name,
    status: paymentData.status,
    org_id: orgId,
  });
};

export const createSubscriptionForOrganization = async (
  { plan }: { plan: string },
) => {

  const orgId = await getActiveOrgId();

  if (!orgId) {
    throw new Error("No active organization context found");
    }
    
    const payment = await getOrganizationPayment();
    if (payment.status !== "COMPLETED") {
        throw new Error("Payment not completed. Cannot create subscription.");
    }
    

  const subscription = await db.insert(subscriptions).values({
    org_id: orgId,
    plan: payment.product_name,
    status: "ACTIVE",
    ended_at: null, // Set ended_at to null for active subscriptions
  });
};
