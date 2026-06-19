import db from "@/lib/db"
import { payments } from "@/lib/db/schema"
import { getActiveOrgId } from "../../auth/services/org-context.service"

export const saveInitiatedPayment = async (paymentData: any) => { 
  const orgId = await getActiveOrgId()
  if (!orgId) { 
    throw new Error("No active organization context found")
  }
  
  const paymnet=await db.insert(payments).values({
    amount: paymentData.amount,
    currency: paymentData.currency,
    product_id: paymentData.product_id,
    product_name: paymentData.product_name,
    status: paymentData.status,
    org_id: orgId,

  })
}