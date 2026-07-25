import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export function useSiteContent<T>(docId: string, initialData: T) {
  const [content, setContent] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, "siteContent", docId);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setContent({ ...initialData, ...snapshot.data() } as T);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firestore siteContent error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docId]);

  return { content, loading };
}
