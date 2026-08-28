export async function saveLead(leadData: {
  name: string;
  phone: string;
  businessName: string;
  websiteType: string;
  source: "chatbot" | "contact_form" | "price_estimator" | "referral_form";
  email?: string;
  projectDescription?: string;
  website?: string;
}) {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...leadData,
        email: leadData.email || "",
        projectDescription: leadData.projectDescription || "",
        website: leadData.website || "",
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      throw new Error(result.error || `Lead API returned ${response.status}`);
    }

    return result.id as string | undefined;
  } catch (error: any) {
    console.error("Lead Save Error:", error);
    throw new Error(`Failed to save lead: ${error.message || String(error)}`);
  }
}
