import { ref, push, set } from "firebase/database";
import { rtdb, auth } from "../lib/firebase";

export async function saveLead(leadData: {
  name: string;
  phone: string;
  businessName: string;
  websiteType: string;
  source: "chatbot" | "contact_form";
  email?: string;
  projectDescription?: string;
  website?: string;
}) {
  try {
    const leadsRef = ref(rtdb, "leads");
    const newLeadRef = push(leadsRef);
    await set(newLeadRef, {
      ...leadData,
      timestamp: new Date().toISOString(),
      userId: auth.currentUser?.uid || "anonymous",
    });
    return newLeadRef.key;
  } catch (error: any) {
    console.error("RTDB Error:", error);
    throw new Error(`Failed to save lead: ${error.message}`);
  }
}
