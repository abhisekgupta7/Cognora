import { NextRequest, NextResponse } from "next/server";
import { Khalti } from "@/lib/khalti";
import {
  updatePayment,
  createSubscriptionForOrganization,
} from "@/app/features/billing/services/verify";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.pidx) {
      return NextResponse.json(
        { verified: false, message: "Missing payment ID" },
        { status: 400 },
      );
    }

    const data = await Khalti.verify({ pidx: body.pidx });

    if (data.status === "Completed") {
      try {
        await updatePayment({
          ...data,
          status: "COMPLETED",
          currency: "NPR",
        });
      } catch (error) {
        console.error("Error updating payment:", error);
      }

      try {
        await createSubscriptionForOrganization({
          plan: body.purchase_order_name,
        });
      } catch (error) {
        throw new Error("Payment verified but failed to create subscription");
      }

      return NextResponse.json({
        verified: true,
        message: "Payment verified successfully",
        status: data.status,
        data,
      });
    }

    return NextResponse.json(
      {
        verified: false,
        message: `Payment is ${data.status.toLowerCase()}`,
        status: data.status,
        data,
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("VERIFY ERROR:", error);

    return NextResponse.json(
      {
        verified: false,
        message: error instanceof Error ? error.message : "Verification failed",
      },
      { status: 400 },
    );
  }
}
