/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const fetch = require("node-fetch");
// const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

initializeApp();

exports.searchFragrance = onCall(async (request) => {
  try {
    // The client will pass { q: "Dior Sauvage" }
    const query = request.data.q;

    if (!query) {
      throw new HttpsError("invalid-argument", "Missing search query.");
    }

    const response = await fetch(
      `https://api.fragella.com/api/v1/fragrances?search=${encodeURIComponent(query)}`,
      {
        headers: {
          "x-api-key": process.env.FRAGELLA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new HttpsError("internal", `Fragella API error: ${response.status}`);
    }

    const results = await response.json();

    // Return results to the client
    return { results };
  } catch (err) {
    console.error(err);
    if (err instanceof HttpsError) throw err;
    throw new HttpsError("unknown", "Search failed: " + err.message);
  }
});