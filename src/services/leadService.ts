import { supabase } from "../lib/supabase";

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
    const { data: userData } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          ...leadData,
          timestamp: new Date().toISOString(),
          user_id: userData?.user?.id || null,
        }
      ])
      .select('id')
      .single();

    if (error) throw error;
    
    return data.id;
  } catch (error: any) {
    console.error("Supabase Error:", error);
    throw new Error(`Failed to save lead: ${error.message}`);
  }
}
