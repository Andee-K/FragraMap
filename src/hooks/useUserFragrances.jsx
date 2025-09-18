import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export function useUserFragrances(uid, status = null) {
  const [fragrances, setFragrances] = useState(
    status ? [] : { testing: [], bookmarked: [], finished: [] }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let colRef = collection(db, "users", uid, "fragrances");

    // If a specific status is requested, narrow down with a query
    if (status) {
      colRef = query(colRef, where("status", "==", status));
    }

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      // For finished fragrances
      if (status) {
        const filtered = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFragrances(filtered);
      } else {
        const grouped = { testing: [], bookmarked: [], finished: [] };
        snapshot.docs.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          if (grouped[data.status]) {
            grouped[data.status].push(data);
          }
        });
        setFragrances(grouped);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid, status]);

  return { fragrances, loading };
}
