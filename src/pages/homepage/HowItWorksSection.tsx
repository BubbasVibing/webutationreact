import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOsintData,
  resetOsintState,
} from "../../redux-store/osintSlice/osintSlice";
import { AppDispatch, RootState } from "../../redux-store/store";
import "./homepage.css";

interface Props {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  getPlaceholderText: () => string;
}

const exportToCSV = (data: any[], filename: string) => {
  if (!data || !data.length) return;

  const keys = Object.keys(data[0]);
  const csvContent = [
    keys.join(","),
    ...data.map((item) =>
      keys
        .map((key) => {
          const value = item[key];
          if (typeof value === "object" && value !== null) {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${String(value ?? "").replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const HowItWorksSection = ({
  activeTab,
  handleTabChange,
  getPlaceholderText,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchInput, setSearchInput] = useState("");

  const { data, status, loading, error } = useSelector(
    (state: RootState) => state.osint
  );

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    dispatch(resetOsintState());

    const payload: {
      name?: string;
      email?: string;
      phone?: string;
      username?: string;
    } = {};

    if (activeTab === "name") payload.name = searchInput;
    else if (activeTab === "email") payload.email = searchInput;
    else if (activeTab === "phone") payload.phone = searchInput;
    else if (activeTab === "username") payload.username = searchInput;

    await dispatch(fetchOsintData(payload)).unwrap();
  };

  return (
    <div className="how-it-works-section">
      <h2>How it works</h2>

      <p className="how-it-works-description">
        Using advanced algorithms, OSINT methodology and investigative
        technologies, Webutation scours social media, public records, and other
        digital footprints to provide actionable intelligence.
      </p>

      <div className="search-container">
        <div className="search-tabs">
          {["name", "username", "phone", "email"].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="search-input-container">
          <div className="search-input-wrapper">
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16Z"
                  stroke="#3662AE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L18 18"
                  stroke="#3662AE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={getPlaceholderText()}
              className="search-input"
            />
            <div className="clear-search" onClick={() => setSearchInput("")}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12"
                  stroke="#C5C5C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 4L12 12"
                  stroke="#C5C5C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <button className="search-button" onClick={handleSearch}>
            Search Now
          </button>
        </div>

        <p className="search-description">
          Search by name, username, phone, or email to confidentially lookup
          information about people you know such as yourself, friends, family,
          acquaintances, and old classmates.
        </p>

        {/* 🕒 Loading */}
        {loading && (
          <p className="status-message">🔄 Processing OSINT request...</p>
        )}

        {error && <p className="status-message error">{error}</p>}

        {status === "completed" && data && (
          <div className="osint-results">
            <h4>OSINT Results:</h4>

            <button
              className="csv-button"
              onClick={() => exportToCSV(data, "osint-results.csv")}
            >
              Export CSV
            </button>

            <pre className="results-json">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default HowItWorksSection;
