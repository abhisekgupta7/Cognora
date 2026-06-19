
import { khalti } from "@paybridgejs/khalti";

export const Khalti = new khalti({
  secretKey: process.env.KHALTI_SECRET_KEY!,
});