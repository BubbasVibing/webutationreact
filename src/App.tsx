import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import Contact from "./pages/contact/contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/about/about";
import Careers from "./pages/careers/careers";
import Case from "./components/case/case";
import "./App.css";

// This component will handle redirecting from /case to / while opening the modal
const CaseRedirect = ({ openModal }: { openModal: () => void }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Open the modal and redirect to home
    openModal();
    navigate("/", { replace: true });
  }, [openModal, navigate]);

  return null;
};

function App() {
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);

  const openCaseModal = () => setIsCaseModalOpen(true);
  const closeCaseModal = () => setIsCaseModalOpen(false);

  return (
    <Router>
      {/* Modal is rendered at the app level, so it can appear over any page */}
      <Case isOpen={isCaseModalOpen} onClose={closeCaseModal} />

      <ToastContainer position="top-right" autoClose={3000} />
      {/* Pass the openModal function down to components that need it */}
      <Routes>
        <Route path="/" element={<Homepage openCaseModal={openCaseModal} />} />
        <Route
          path="/contact"
          element={<Contact openCaseModal={openCaseModal} />}
        />
        <Route
          path="/about"
          element={<About openCaseModal={openCaseModal} />}
        />
        <Route
          path="/careers"
          element={<Careers openCaseModal={openCaseModal} />}
        />
        <Route
          path="/case"
          element={<CaseRedirect openModal={openCaseModal} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
