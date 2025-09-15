import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
import dayjs from "dayjs";

/**
 * Build a stable fragrance id from brand + name
 * - Accepts either Name/Brand or name/brand
 */
export function toFragranceId(fragrance_name, fragrance_brand) {
  const brand = String(fragrance_brand ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const name = String(fragrance_name ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${brand}-${name}`;
}

/**
 * Adds a fragrance to the user's collection, creating a global record if needed.
 * Uses a transaction to ensure atomic creation.
 * Returns a consistent shape: { success, id, created }
 */
export async function addUserFragrance(uid, fragranceInfo) {
  const brand = fragranceInfo.Brand || fragranceInfo.brand;
  const name = fragranceInfo.Name || fragranceInfo.name;

  if (!uid) throw new Error("User not authenticated");
  if (!brand || !name) {
    throw new Error("Fragrance must include Brand and Name (or brand/name)");
  }

  const fragranceId = fragranceInfo.id || toFragranceId(name, brand);
  const globalRef = doc(db, "globalFragrances", fragranceId);
  const userRef = doc(db, "users", uid, "fragrances", fragranceId);

  const result = await runTransaction(db, async (tx) => {
    const [globalSnap, userSnap] = await Promise.all([
      tx.get(globalRef),
      tx.get(userRef),
    ]);

    if (!globalSnap.exists()) {
      // Keep global doc minimal and consistent
      tx.set(globalRef, {
        ...fragranceInfo,
        createdAt: serverTimestamp(),
      });
    }

    if (userSnap.exists()) {
      // Already exists for user
      return { success: true, id: fragranceId, created: false };
    }

    const baseUserDoc = {
      globalRef: globalRef.path,
      name,
      brand,
      rating: null,
      personalNotes: "",
      status: "none", // neutral default
      testDate: null,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    };

    tx.set(userRef, baseUserDoc);

    return { success: true, id: fragranceId, created: true };
  });

  return result;
}

/**
 * Update fields on a user's fragrance document
 * Returns { success: true, id }
 */
export async function updateUserFragrance(uid, fragranceId, patch) {
  if (!uid) throw new Error("User not authenticated");
  if (!fragranceId) throw new Error("fragranceId is required");
  const ref = doc(db, "users", uid, "fragrances", fragranceId);

  try {
    await updateDoc(ref, { ...patch, lastUpdated: serverTimestamp() });
    return { success: true, id: fragranceId };
  } catch (error) {
    console.error("[updateUserFragrance] failed", error?.code, error?.message, {
      path: ref.path,
      patch,
    });
    return { success: false, id: fragranceId, error: error.message };
  }
}

/**
 * Delete a single user fragrance document
 * Returns { success, deleted, id?, error? }
 */
export async function deleteUserFragrance(uid, fragranceId) {
  if (!uid) throw new Error("User not authenticated");
  if (!fragranceId) throw new Error("fragranceId is required");
  const ref = doc(db, "users", uid, "fragrances", fragranceId);

  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      console.warn("[deleteUserFragrance] doc not found", { path: ref.path });
      return { success: true, deleted: false, id: fragranceId };
    }

    await deleteDoc(ref);
    return { success: true, deleted: true, id: fragranceId };
  } catch (error) {
    console.error("[deleteUserFragrance] failed", error?.code, error?.message, {
      path: ref.path,
    });
    return {
      success: false,
      deleted: false,
      id: fragranceId,
      error: error.message,
    };
  }
}

/**
 * Reads a single user fragrance once
 * Returns object or null
 */
export async function getUserFragrance(uid, fragranceId) {
  if (!fragranceId) throw new Error("fragranceId is required");
  const ref = doc(db, "users", uid, "fragrances", fragranceId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Reads a single global fragrance once
 */
export async function getGlobalFragrance(fragranceId) {
  if (!fragranceId) throw new Error("fragranceId is required");
  const ref = doc(db, "globalFragrances", fragranceId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Utility to format Firestore timestamps with dayjs
 */
export function formatDate(timestamp) {
  if (!timestamp) return "-";
  if (timestamp.seconds) {
    // Firestore Timestamp
    return dayjs.unix(timestamp.seconds).format("MMM D, YYYY");
  }
  // JS Date or ISO string or dayjs
  return dayjs(timestamp).isValid()
    ? dayjs(timestamp).format("MMM D, YYYY")
    : "-";
}

// Map longevity % to scale 1–5
export function getLongevityScale(value) {
  const num = value.slice(0, -1); // remove trailing %
  if (num <= 20) return { rating: 1, label: "Very Weak (1–2 hrs)" };
  if (num <= 40) return { rating: 2, label: "Weak (2–4 hrs)" };
  if (num <= 60) return { rating: 3, label: "Moderate (4–6 hrs)" };
  if (num <= 80) return { rating: 4, label: "Long Lasting (6–10 hrs)" };
  return { rating: 5, label: "Beast Mode (10+ hrs)" };
}

// Map sillage % to scale 1–5
export function getSillageScale(value) {
  const num = value.slice(0, -1); // remove trailing %
  if (num <= 20) return { rating: 1, label: "Very Intimate (only you can smell it)" };
  if (num <= 40) return { rating: 2, label: "Close (arm’s length)" };
  if (num <= 60) return { rating: 3, label: "Moderate (a few feet)" };
  if (num <= 80) return { rating: 4, label: "Strong (fills a room)" };
  return { rating: 5, label: "Beast Mode (leaves a scent trail)" };
}