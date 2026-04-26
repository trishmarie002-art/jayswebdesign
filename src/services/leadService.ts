import { collection, addDoc } from "firebase/firestore";
import { db, handleFirestoreError } from "../lib/firebase";

export async function saveLead(leadData: {
  name: string;
  email: string;
  phone?: string;
  projectDescription?: string;
  source: "chatbot" | "contact_form";
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
