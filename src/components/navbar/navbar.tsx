import { useState, useEffect, RefObject } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import WebutationLogo from '../../assets/logo.svg';

interface NavbarProps {
  scrollContainerRef?: RefObject<HTMLDivElement>;
  openCaseModal: () => void;
}

const Navbar = ({ scrollContainerRef, openCaseModal }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef || !scrollContainerRef.current) {
      // Handle case when no container is provided (static navbar)
      return;
    }
    
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      if (container) {
        const scrollTop = container.scrollTop;
        const newScrolled = scrollTop > 50;
        
        console.log(`Scroll Y: ${scrollTop}, Navbar scrolled: ${newScrolled}`);
        
        setScrolled(newScrolled);
      }
    };
    
    // Add event listener to the container instead of window
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
    
    // Clean up
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-links">
        <Link to="/contact">Contact</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/about">About Us</Link>
        <div className="dropdown">
          <span>Services <span className="dropdown-arrow">⌄</span></span>
        </div>
      </div>

      <div className="logo-container">
        <Link to="/">
          <img src={WebutationLogo} alt="Webutation Logo" className="logo" />
        </Link>
      </div>
      
      <div className="navbar-right">
        <button onClick={openCaseModal} className="btn btn-outline">Refer a Case</button>
        <button className="btn btn-filled">Book a Demo</button>
      </div>
    </nav>
  );
};

export default Navbar;
