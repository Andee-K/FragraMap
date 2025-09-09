import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

// Helper function to create a fragrance ID
export function toFragranceId(fragrance_name, fragrance_brand) {
  const brand = fragrance_brand
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");
  const name = fragrance_name
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");

  return `${brand}-${name}`;
}

// Adds to global fragrance collection + user's fragrance subcollection
export async function addUserFragrance(uid, fragranceInfo, fragranceStatus) {
  const fragranceId = toFragranceId(fragranceInfo.Name, fragranceInfo.Brand);
  const globalRef = doc(db, "globalFragrances", fragranceId);
  const userRef = doc(db, "users", uid, "fragrances", fragranceId);

  return runTransaction(db, async (tx) => {
    // 1) READS FIRST
    let globalSnap, userSnap;
    try {
      globalSnap = await tx.get(globalRef); // requires read permission on globalFragrances/{fragranceId}
      userSnap = await tx.get(userRef); // requires read permission on users/{uid}/fragrances/{fragranceId}
    } catch (e) {
      console.error("[addUserFragrance] read failed", e?.code, e?.message, {
        paths: [globalRef.path, userRef.path],
      });
      throw e;
    }

    // 2) WRITES AFTER ALL READS
    if (!globalSnap.exists()) {
      tx.set(globalRef, {
        id: fragranceId,
        ...fragranceInfo,
        createdAt: serverTimestamp(),
      });
      console.log("[addUserFragrance] queued create global", fragranceId);
    } else {
      console.log("[addUserFragrance] global already exists", fragranceId);
    }

    if (userSnap.exists()) {
      console.log("[addUserFragrance] user already has fragrance", fragranceId);
      return { id: fragranceId, created: false };
    }

    const userFragranceData = {
      globalRef: globalRef.path,
      status: fragranceStatus,
      rating: null,
      personalNotes: "",
      createdAt: serverTimestamp(),
      testDate: null,
      name: fragranceInfo.Name,
      brand: fragranceInfo.Brand,
    };

    tx.set(userRef, userFragranceData);
    console.log("[addUserFragrance] queued create user doc", userRef.path);

    return { id: fragranceId, created: true };
  });
}

// Atomically update fields on a user fragrance document
export async function updateUserFragrance(uid, fragranceId, patch) {
  const ref = doc(db, "users", uid, "fragrances", fragranceId);

  try {
    await updateDoc(ref, { ...patch, lastUpdated: serverTimestamp() });
    return { success: true };
  } catch (error) {
    console.error("Failed to update fragrance:", error);
    return { success: false, error: error.message };
  }
}

// Read a single user fragrance once
export async function getUserFragrance(uid, fragranceId) {
  const ref = doc(db, "users", uid, "fragrances", fragranceId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
