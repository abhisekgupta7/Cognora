"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SuccessClientPage() {
  const searchParams = useSearchParams();

  const { pidx, purchase_order_name } = Object.fromEntries(
    searchParams.entries(),
  );

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verifyPayment() {
      try {
        if (!pidx) {
          setMessage("Missing payment ID");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pidx, purchase_order_name }),
        });

        const data = await response.json();

        if (data.verified) {
          setVerified(true);
          setMessage(data.message);
        } else {
          setVerified(false);
          setMessage(data.message ?? "Payment verification failed");
        }
      } catch {
        setVerified(false);
        setMessage("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [pidx]);

  if (loading) {
    return <div>Verifying payment...</div>;
  }

  return (
    <div>
      <h1>{verified ? "Payment Successful" : "Payment Failed"}</h1>
      <p>{message}</p>
      <p>Pidx: {pidx}</p>
    </div>
  );
}
