import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserFragrances } from "../hooks/useUserFragrances";
import SearchBar from "../features/search/SearchBar";
import { FragranceTable } from "../components/FragranceTable";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fragrances, loading } = useUserFragrances(user.uid);
  const [activeTab, setActiveTab] = useState("testing"); // for mobile toggle

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="dashboard-container p-4 py-8">
      <h1 className="text-2xl">
        Welcome, <span className="font-medium">{user.displayName}!</span>
      </h1>

      <SearchBar onSearch={handleSearch} loading={false} />
      <h2 className="text-xl font-semibold">Your Fragrances</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Mobile: Tabs */}
          <div className="block xl:hidden">
            <div className="flex border-b mb-4">
              {/* Testing Tab */}
              <button
                className={`flex-1 py-4 text-center hover:cursor-pointer ${
                  activeTab === "testing"
                    ? "border-b-2 border-black font-bold"
                    : ""
                }`}
                onClick={() => setActiveTab("testing")}
              >
                Testing
              </button>
              {/* Bookmarked Tab */}
              <button
                className={`flex-1 py-4 text-center hover:cursor-pointer ${
                  activeTab === "bookmarked"
                    ? "border-b-2 border-black font-bold"
                    : ""
                }`}
                onClick={() => setActiveTab("bookmarked")}
              >
                Bookmarked
              </button>
            </div>

            {activeTab === "testing" && (
              <FragranceTable title="Testing" data={fragrances.testing} />
            )}
            {activeTab === "bookmarked" && (
              <FragranceTable title="Bookmarked" data={fragrances.bookmarked} />
            )}
          </div>

          {/* Desktop: Side by side */}
          <div className="hidden xl:flex gap-4">
            <div className="flex-1">
              <FragranceTable title="Testing" data={fragrances.testing} />
            </div>
            <div className="flex-1">
              <FragranceTable title="Bookmarked" data={fragrances.bookmarked} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
