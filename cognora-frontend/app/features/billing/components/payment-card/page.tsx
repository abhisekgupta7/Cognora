"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Plan = [
  {
    id: 1,
    name: "Free",
    price: 0,
    isPopular: false,
    tagline: "For individuals getting started",
    title: "Start with Free Plan",
    features: ["Basic Feature 1", "Basic Feature 2"],
  },
  {
    id: 2,
    name: "Pro",
    price: 9.99,
    isPopular: true,
    tagline: "For professionals and teams",
    title: "Upgrade to Pro Plan",
    features: ["Pro Feature 1", "Pro Feature 2", "Pro Feature 3"],
  },
  {
    id: 3,
    name: "Enterprise",
    price: 49.99,
    isPopular: false,
    tagline: "For large organizations",
    title: "Contact Sales for Enterprise Plan",
    features: [
      "Enterprise Feature 1",
      "Enterprise Feature 2",
      "Enterprise Feature 3",
      "Enterprise Feature 4",
    ],
  },
];

const handlePayment = (plan: (typeof Plan)[0]) => {
  const response = fetch("/api/payment/initiate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      planId: plan.id,
      price: plan.price,
      productName: plan.name,
    }),
  });
};

export default function PaymentCard() {
  return (
    <div>
      <h2>Payment </h2>
      <div>
        {Plan.map((plan) => (
          <Card key={plan.id}>
            <h3>{plan.name}</h3>
            <p>${plan.price.toFixed(2)}</p>
            <Button
              onClick={() => {
                handlePayment(plan);
              }}
            >
              {plan.title}
            </Button>
            <p>{plan.tagline}</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
