// hooks/useUserFragrances.js
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export function useUserFragrances(uid) {
  const [fragrances, setFragrances] = useState({
    testing: [],
    bookmarked: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "users", uid, "fragrances");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const grouped = {
        testing: [],
        bookmarked: [],
      };

      snapshot.docs.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (grouped[data.status]) {
          grouped[data.status].push(data);
        }
      });

      setFragrances(grouped);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { fragrances, loading };
}
