import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";
import { Building2 } from "lucide-react";

export default async function orgDetails() { 
      const orgId = await getActiveOrgId();
      if (!orgId) {
        throw new Error(
          "No active organization found. Please select an organization to proceed.",
        );
      }
    return (
    <div className="flex items-center gap-3 text-[#1C1C1C]">
      
      {/* Approachable branding accent token */}
      <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] shrink-0">
        <Building2 className="w-5 h-5" strokeWidth={2.2} />
      </div>
      
      {/* Meta Organization Parameters */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C1C1C]/40 block leading-none">
          Active workspace
        </span>
        <span className="text-sm font-medium text-[#1C1C1C]/70 block mt-1.5 leading-none">
          ID: <span className="font-mono font-bold text-[#1C1C1C]">{orgId}</span>
        </span>
      </div>

    </div>
    );
}