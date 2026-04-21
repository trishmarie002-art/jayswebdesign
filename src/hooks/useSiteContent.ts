import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useSiteContent<T>(docId: string, initialData: T) {
  const [content, setContent] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "siteContent", docId), (docSnap) => {
      if (docSnap.exists()) {
        setContent(docSnap.data() as T);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [docId]);

  return { content, loading };
}
