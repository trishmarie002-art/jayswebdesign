import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function saveLead(leadData: {
  name: string;
  phone: string;
  businessName: string;
  websiteType: string;
  source: "chatbot" | "contact_form" | "price_estimator";
  email?: string;
  projectDescription?: string;
  website?: string;
}) {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      ...leadData,
      email: leadData.email || "",
      projectDescription: leadData.projectDescription || "",
      website: leadData.website || "",
      timestamp: new Date().toISOString(),
    });
    
    return docRef.id;
  } catch (error: any) {
    console.error("Firestore Lead Save Error:", error);
    throw new Error(`Failed to save lead: ${error.message || String(error)}`);
  }
}
