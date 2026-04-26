import { collection, addDoc } from "firebase/firestore";
import { db, handleFirestoreError } from "../lib/firebase";

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
    const docRef = await addDoc(collection(db, "leads"), {
      ...leadData,
      timestamp: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, "create", "leads");
  }
}
