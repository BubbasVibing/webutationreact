// =================== PeopleSearch.tsx =================== //

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPeopleDataLabs,
  resetPeopleDataLabsState,
} from "../../redux-store/peopleDataLabsSlice/peopleDataLabsSlice";
import { AppDispatch, RootState } from "../../redux-store/store";

const PeopleSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState("");

  const { data, status, loading, error } = useSelector(
    (state: RootState) => state.peopleDataLabs
  );

  const handleSearch = async () => {
    if (!jobTitle.trim() || !country.trim()) return;

    dispatch(resetPeopleDataLabsState());

    const payload = {
      query: {
        bool: {
          must: [
            { term: { job_title: jobTitle } },
            { term: { location_country: country } },
          ],
        },
      },
      size: 5,
      dataset: "resume",
      titlecase: true,
      pretty: false,
    };

    await dispatch(fetchPeopleDataLabs(payload)).unwrap();
  };

  return (
    <div className="people-search-section">
      <h2>People Search (via People Data Labs)</h2>

      <p>Search for professional profiles using job title and country.</p>

      <div className="people-search-form">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter Job Title (e.g., Data Scientist)"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter Country (e.g., United States)"
        />
        <button className="people-search-button" onClick={handleSearch}>
          Search Now
        </button>
      </div>

      {loading && (
        <p className="people-search-status">🔄 Searching People Data Labs...</p>
      )}
      {error && <p className="people-search-error">{error}</p>}

      {status === "completed" && data && (
        <div className="people-search-results">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PeopleSearch;
