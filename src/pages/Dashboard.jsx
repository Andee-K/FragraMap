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
  const [activeTab, setActiveTab] = useState("testing");

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="dashboard-container p-5 sm:p-8 max-break-w:px-0">
      <h1 className="text-2xl">
        Welcome, <span className="font-medium">{user.displayName}!</span>
      </h1>

      <SearchBar onSearch={handleSearch} loading={false} />
      <h2 className="text-xl font-semibold">Your Fragrances</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Tabs only */}
          <div>
            {/* Tabs with sliding underline */}
            <div className="relative">
              <div className="flex border-b mb-4 relative">
                {/* Buttons */}
                <button
                  className={`flex-1 py-4 text-center hover:cursor-pointer ${
                    activeTab === "testing"
                      ? "font-bold text-primary-900"
                      : "font-medium"
                  }`}
                  onClick={() => setActiveTab("testing")}
                >
                  Testing
                </button>
                <button
                  className={`flex-1 py-4 text-center hover:cursor-pointer ${
                    activeTab === "bookmarked"
                      ? "font-bold text-primary-900"
                      : "font-medium"
                  }`}
                  onClick={() => setActiveTab("bookmarked")}
                >
                  Bookmarked
                </button>

                {/* Sliding underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] w-1/2 bg-primary-900 transition-transform duration-300 ease-in-out`}
                  style={{
                    transform:
                      activeTab === "testing"
                        ? "translateX(0%)"
                        : "translateX(100%)",
                  }}
                />
              </div>
            </div>

            {activeTab === "testing" && (
              <FragranceTable title="Testing" data={fragrances.testing} />
            )}
            {activeTab === "bookmarked" && (
              <FragranceTable title="Bookmarked" data={fragrances.bookmarked} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
