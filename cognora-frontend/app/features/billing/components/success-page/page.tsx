import SuccessClientPage from "./successPageClient";
import { Suspense } from "react";

export default function SuccessPage() { 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessClientPage />
    </Suspense>
  )
}