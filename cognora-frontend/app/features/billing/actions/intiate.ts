import { NextResponse } from "next/server"
import { Khalti } from "@/lib/khalti"
import { saveInitiatedPayment } from "../services/initiate"

export async function POST(request: Request) {
  const { planId, price, productName } = await request.json()

  const payment = await Khalti.initiate({
    return_url: `${process.env.DOMAIN!}/success`,
    website_url: process.env.DOMAIN!,
    amount: price * 100, // Convert to paisa
    purchase_order_id: `ORDER-${planId}`,
    purchase_order_name: productName,
  })
    console.log("INITIATE RESPONSE:", payment)
    
    // save in database if needed in paymnet with pending 
    await saveInitiatedPayment({ ...payment, status: "PENDING" })

  return NextResponse.json(payment)
}