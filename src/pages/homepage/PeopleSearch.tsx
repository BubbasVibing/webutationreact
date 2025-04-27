// =================== PeopleSearch.tsx =================== //

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPeopleDataLabs,
  resetPeopleDataLabsState,
} from "../../redux-store/peopleDataLabsSlice/peopleDataLabsSlice";
import { AppDispatch, RootState } from "../../redux-store/store";
import Select from "react-select";
import { getNames } from "country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// =================== Setup Country Options =================== //
const countryOptions = getNames().map((country) => ({
  value: country,
  label: country,
}));

const PeopleSearch = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const { data, status, loading, error } = useSelector(
    (state: RootState) => state.peopleDataLabs
  );

  const handleSearch = async () => {
    if (!name.trim() && !phone && !country) {
      alert("Please enter Name, Phone or select a Country before searching.");
      return;
    }

    dispatch(resetPeopleDataLabsState());

    const payload = {
      name: name.trim(),
      phone: phone,
      country: country?.value,
      size: 5,
      dataset: "all",
      titlecase: true,
      pretty: false,
    };

    try {
      await dispatch(fetchPeopleDataLabs(payload)).unwrap();
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div
      className="people-search-section"
      style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        People Search (via People Data Labs)
      </h2>

      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        Search by Full Name, Phone Number, or Country.
      </p>

      <div
        className="people-search-form"
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Full Name"
          style={{
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        <PhoneInput
          placeholder="Enter Phone Number"
          value={phone}
          onChange={setPhone}
          defaultCountry="US"
          international
          countryCallingCodeEditable={false}
          style={{
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        <Select
          options={countryOptions}
          value={country}
          onChange={(selected) => setCountry(selected)}
          placeholder="Select Country"
          styles={{
            control: (base) => ({
              ...base,
              padding: "2px",
              borderRadius: "8px",
              borderColor: "#ccc",
              fontSize: "16px",
            }),
          }}
        />

        <button
          className="people-search-button"
          onClick={handleSearch}
          style={{
            padding: "0.8rem",
            backgroundColor: "#007BFF",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "1rem",
          }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Now"}
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        {loading && (
          <p style={{ textAlign: "center" }}>
            🔄 Searching People Data Labs...
          </p>
        )}

        {error && (
          <p style={{ textAlign: "center", color: "red", marginTop: "1rem" }}>
            {typeof error === "string"
              ? error
              : (error as any)?.message || "An unexpected error occurred."}
          </p>
        )}

        {status === "completed" && (
          <>
            {data && data.length > 0 ? (
              <div
                className="people-search-results"
                style={{ marginTop: "1rem" }}
              >
                <pre
                  style={{
                    backgroundColor: "#f8f8f8",
                    padding: "1rem",
                    borderRadius: "8px",
                    overflowX: "auto",
                  }}
                >
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "gray",
                  marginTop: "1rem",
                }}
              >
                No results found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PeopleSearch;
