import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Homepage from './pages/homepage/homepage';
import Contact from './pages/contact/contact';
import Case from './components/case/case';
import './App.css';

// This component will handle redirecting from /case to / while opening the modal
const CaseRedirect = ({ openModal }: { openModal: () => void }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Open the modal and redirect to home
    openModal();
    navigate('/', { replace: true });
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
      
      {/* Pass the openModal function down to components that need it */}
      <Routes>
        <Route path="/" element={<Homepage openCaseModal={openCaseModal} />} />
        <Route path="/contact" element={<Contact openCaseModal={openCaseModal} />} />
        <Route path="/case" element={<CaseRedirect openModal={openCaseModal} />} />
      </Routes>
    </Router>
  );
}

export default App;
