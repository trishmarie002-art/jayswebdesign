import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useSiteContent<T>(docId: string, initialData: T) {
  const [content, setContent] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: any;

    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("*")
          .eq("id", docId)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error("Error fetching site content:", error);
        } else if (data) {
          setContent(data as unknown as T);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes
          schema: 'public',
          table: 'site_content',
          filter: `id=eq.${docId}`
        },
        (payload) => {
          setContent(payload.new as unknown as T);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [docId]);

  return { content, loading };
}
