import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";

export default async function orgDetails() { 
      const orgId = await getActiveOrgId();
      if (!orgId) {
        throw new Error(
          "No active organization found. Please select an organization to proceed.",
        );
      }
    return (
      <div className="p-4 border rounded-lg bg-green/5 border-white/10">
        <h2 className="text-lg font-semibold text-black">Organization Details</h2>
        <p className="text-black">Active Organization ID: {orgId}</p>
      </div>
    );
}